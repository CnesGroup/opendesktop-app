#!/bin/bash

################################################################################
# This is utility script to build distribution packages
################################################################################

PKGNAME='opendesktop-app'

BUILDTYPE=''
if [ "${1}" ]; then
    BUILDTYPE="${1}"
fi

PROJDIR="$(cd "$(dirname "${0}")/../" && pwd)"

BUILDVER="$(cd "${PROJDIR}" && git describe --always)"

BUILDDIR="${PROJDIR}/build_${PKGNAME}_${BUILDVER}_${BUILDTYPE}"

SRCARCHIVE="${BUILDDIR}/${PKGNAME}.tar.gz"

export_srcarchive() {
    filepath="${1}"
    $(cd "${PROJDIR}" && git archive --prefix="${PKGNAME}/" --output="${filepath}" HEAD)
}

build_ubuntu() {
    cd "${PROJDIR}"
    mkdir -p "${BUILDDIR}"
    export_srcarchive "${SRCARCHIVE}"

    tar -xzvf "${SRCARCHIVE}" -C "${BUILDDIR}"
    cp -r "${PROJDIR}/pkg/ubuntu/debian" "${BUILDDIR}/${PKGNAME}"
    cd "${BUILDDIR}/${PKGNAME}"
    debuild -uc -us -b
}

build_fedora() {
    cd "${PROJDIR}"
    mkdir -p "${BUILDDIR}"
    export_srcarchive "${SRCARCHIVE}"

    mkdir "${BUILDDIR}/SOURCES"
    mkdir "${BUILDDIR}/SPECS"
    mv "${SRCARCHIVE}" "${BUILDDIR}/SOURCES"
    cp "${PROJDIR}/pkg/fedora/${PKGNAME}.spec" "${BUILDDIR}/SPECS"
    rpmbuild --define "_topdir ${BUILDDIR}" -bb "${BUILDDIR}/SPECS/${PKGNAME}.spec"
}

build_opensuse() {
    cd "${PROJDIR}"
    mkdir -p "${BUILDDIR}"
    export_srcarchive "${SRCARCHIVE}"

    mkdir "${BUILDDIR}/SOURCES"
    mkdir "${BUILDDIR}/SPECS"
    mv "${SRCARCHIVE}" "${BUILDDIR}/SOURCES"
    cp "${PROJDIR}/pkg/opensuse/${PKGNAME}.spec" "${BUILDDIR}/SPECS"
    rpmbuild --define "_topdir ${BUILDDIR}" -bb "${BUILDDIR}/SPECS/${PKGNAME}.spec"
}

build_archlinux() {
    cd "${PROJDIR}"
    mkdir -p "${BUILDDIR}"
    export_srcarchive "${SRCARCHIVE}"

    cp "${PROJDIR}/pkg/archlinux/PKGBUILD" "${BUILDDIR}"
    cd "${BUILDDIR}"
    updpkgsums
    makepkg -s
}

build_snap() {
    echo 'Not implemented yet'
}

build_appimage() {
    echo 'Not implemented yet'
}

if [ "${BUILDTYPE}" = 'ubuntu' ]; then
    build_ubuntu
elif [ "${BUILDTYPE}" = 'fedora' ]; then
    build_fedora
elif [ "${BUILDTYPE}" = 'opensuse' ]; then
    build_opensuse
elif [ "${BUILDTYPE}" = 'archlinux' ]; then
    build_archlinux
elif [ "${BUILDTYPE}" = 'snap' ]; then
    build_snap
elif [ "${BUILDTYPE}" = 'appimage' ]; then
    build_appimage
else
    echo "sh $(basename "${0}") [ubuntu|fedora|archlinux|snap|appimage]"
    exit 1
fi
