Summary: Opendesktop.org App
Name: opendesktop-app
Version: 2.0.0
Release: 1%{?dist}
License: GPLv3+
Group: Applications/Internet
URL: https://github.com/opendesktop/opendesktop-app

#Source0: https://github.com/opendesktop/opendesktop-app/archive/release-%{version}.tar.gz
Source0: %{name}.tar.gz

Requires: libQt5Gui5 >= 5.3.0, libQt5WebSockets5 >= 5.3.0, libQt5DBus5 >= 5.3.0
BuildRequires: make, automake, gcc, gcc-c++, libtool, libqt5-qtbase-devel >= 5.3.0, libQt5Gui-devel >= 5.3.0, libqt5-qtwebsockets-devel >= 5.3.0, libQt5DBus-devel >= 5.3.0, git, nodejs, npm, rpm-build

%description
The official Opendesktop.org App.

%prep
#%%autosetup -n %{name}-release-%{version}
%autosetup -n %{name}

%build
%define debug_package %{nil}
make

%install
make DESTDIR="%{buildroot}" prefix="/usr" install

%files
%defattr(-,root,root)
%{_bindir}/%{name}
/usr/lib/%{name}-*/*
%{_datadir}/applications/%{name}.desktop
%{_datadir}/icons/hicolor/scalable/apps/%{name}.svg

%clean
rm -rf %{buildroot}

%changelog
* Fri Jun 30 2017 Akira Ohgaki <akiraohgaki@gmail.com> - 2.0.0-1
- Update ocs-manager
- Apply themes for wallpapers, icons, cursors, plasma5_desktopthemes and aurorae_themes with KDE Plasma5 desktop
- Apply themes for wallpapers, icons, cursors, gtk3_themes and gnome_shell_themes with Gnome3/Unity desktop
- Apply themes for wallpapers, icons, cursors, gtk2_themes and xfwm4_themes with XFCE4 desktop
- Fix for conflicted filename

* Fri Jun 09 2017 Akira Ohgaki <akiraohgaki@gmail.com> - 1.0.2-1
- Show site meta header
- Show preview picture in MyCollection
- Added download progress bar in statusbar
- Removed MyCollection button from sidebar
- Fix for download links
- Fix for member site links

* Sun Jun 04 2017 Akira Ohgaki <akiraohgaki@gmail.com> - 1.0.1-1
- Added confirm dialog for download/install
- Added statusbar items
- Show number of installed items

* Sat May 27 2017 Akira Ohgaki <akiraohgaki@gmail.com> - 1.0.0-1
- Removed ocs-url
- Bundled ocs-manager
- Added Collection section

* Wed Apr 19 2017 Akira Ohgaki <akiraohgaki@gmail.com> - 0.1.0-1
- Initial release
