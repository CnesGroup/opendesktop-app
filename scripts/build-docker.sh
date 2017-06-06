#!/bin/bash

################################################################################
# This is wrapper script for build.sh use from inside docker container
################################################################################

PKGNAME='opendesktop-app'

PKGUSER='pkgbuilder'

BUILDTYPE=''
if [ "${1}" ]; then
    BUILDTYPE="${1}"
fi

PROJDIR="$(cd "$(dirname "${0}")/../" && pwd)"

BUILDSCRIPT="${PROJDIR}/scripts/build.sh"

TRANSFERLOG="${PROJDIR}/transfer.log"

install_nodejs() {
    npm cache clean
    npm install n -g
    n latest
    ln -sf /usr/local/bin/node /usr/bin/node
    ln -sf /usr/local/bin/node /usr/bin/nodejs
    ln -sf /usr/local/bin/npm /usr/bin/npm
}

transfer_file() {
    filepath="${1}"
    if [ -f "${filepath}" ]; then
        filename="$(basename "${filepath}")"
        echo "Uploading ${filename}" >> "${TRANSFERLOG}"
        curl -T "${filepath}" "https://transfer.sh/${filename}" >> "${TRANSFERLOG}"
        echo "" >> "${TRANSFERLOG}"
    fi
}

build_ubuntu() {
    # docker-image: ubuntu:16.04
    apt update -qq
    apt -y install build-essential qt5-default libqt5websockets5-dev
    apt -y install git nodejs npm devscripts debhelper fakeroot
    apt -y install curl

    install_nodejs

    useradd -m ${PKGUSER}
    export HOME="/home/${PKGUSER}"
    chown -R ${PKGUSER}:${PKGUSER} "${PROJDIR}"

    su -c "sh "${BUILDSCRIPT}" ${BUILDTYPE}" ${PKGUSER}

    transfer_file "$(find "${PROJDIR}/build_"*${BUILDTYPE} -type f -name "${PKGNAME}*.deb")"
}

build_fedora() {
    # docker-image: fedora:20
    yum -y distro-sync
    yum -y install make automake gcc gcc-c++ libtool qt5-qtbase-devel qt5-qtwebsockets-devel
    yum -y install git nodejs npm rpm-build
    yum -y install curl
    # docker-image: fedora:22
    #dnf -y install make automake gcc gcc-c++ libtool qt5-qtbase-devel qt5-qtwebsockets-devel
    #dnf -y install git nodejs npm rpm-build
    #dnf -y install curl

    ln -sf /usr/bin/qmake-qt5 /usr/bin/qmake

    install_nodejs

    useradd -m ${PKGUSER}
    export HOME="/home/${PKGUSER}"
    chown -R ${PKGUSER}:${PKGUSER} "${PROJDIR}"

    su -c "sh "${BUILDSCRIPT}" ${BUILDTYPE}" ${PKGUSER}

    transfer_file "$(find "${PROJDIR}/build_"*${BUILDTYPE} -type f -name "${PKGNAME}*.rpm")"
}

build_opensuse() {
    # docker-image: opensuse:42.1
    zypper --non-interactive refresh
    zypper --non-interactive install make automake gcc gcc-c++ libtool libqt5-qtbase-devel libQt5Gui-devel libqt5-qtwebsockets-devel libQt5DBus-devel
    zypper --non-interactive install git nodejs npm rpm-build
    zypper --non-interactive install curl

    ln -sf /usr/bin/qmake-qt5 /usr/bin/qmake

    install_nodejs

    useradd -m ${PKGUSER}
    export HOME="/home/${PKGUSER}"
    chown -R ${PKGUSER}:${PKGUSER} "${PROJDIR}"

    su -c "sh "${BUILDSCRIPT}" ${BUILDTYPE}" ${PKGUSER}

    transfer_file "$(find "${PROJDIR}/build_"*${BUILDTYPE} -type f -name "${PKGNAME}*.rpm")"
}

build_archlinux() {
    # docker-image: base/archlinux:latest
    pacman -Syu --noconfirm
    pacman -S --noconfirm base-devel qt5-base qt5-websockets
    pacman -S --noconfirm git nodejs npm
    pacman -S --noconfirm curl

    install_nodejs

    useradd -m ${PKGUSER}
    export HOME="/home/${PKGUSER}"
    chown -R ${PKGUSER}:${PKGUSER} "${PROJDIR}"

    su -c "sh "${BUILDSCRIPT}" ${BUILDTYPE}" ${PKGUSER}

    transfer_file "$(find "${PROJDIR}/build_"*${BUILDTYPE} -type f -name "${PKGNAME}*.pkg.tar.xz")"
}

build_snap() {
    # docker-image: ubuntu:16.04
    apt update -qq
    apt -y install build-essential qt5-default libqt5websockets5-dev
    apt -y install git nodejs npm snapcraft
    apt -y install curl

    install_nodejs

    useradd -m ${PKGUSER}
    export HOME="/home/${PKGUSER}"
    chown -R ${PKGUSER}:${PKGUSER} "${PROJDIR}"

    su -c "sh "${BUILDSCRIPT}" ${BUILDTYPE}" ${PKGUSER}

    transfer_file "$(find "${PROJDIR}/build_"*${BUILDTYPE} -type f -name "${PKGNAME}*.snap")"
}

build_appimage() {
    # docker-image: ubuntu:16.04
    apt update -qq
    apt -y install build-essential qt5-default libqt5websockets5-dev
    apt -y install git nodejs npm fuse zsync desktop-file-utils
    apt -y install curl

    install_nodejs

    modprobe fuse

    useradd -m ${PKGUSER}
    export HOME="/home/${PKGUSER}"
    chown -R ${PKGUSER}:${PKGUSER} "${PROJDIR}"

    su -c "sh "${BUILDSCRIPT}" ${BUILDTYPE}" ${PKGUSER}

    transfer_file "$(find "${PROJDIR}/build_"*${BUILDTYPE} -type f -name "${PKGNAME}*.AppImage")"
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
