SHELL = /bin/sh

TARGET = opendesktop-app
srcdir = .

build_tmpdir = ./build_tmp
ocsmanager_version = 0.1.0

DESTDIR =
prefix = /usr/local
exec_prefix = $(prefix)
bindir = $(exec_prefix)/bin
libdir = $(exec_prefix)/lib
datadir = $(prefix)/share

INSTALL = install
INSTALL_PROGRAM = $(INSTALL) -D -m 755
INSTALL_DATA = $(INSTALL) -D -m 644
MKDIR = mkdir -p
CP = cp -Rpf
RM = rm -rf

.PHONY: all rebuild build clean install uninstall

all: rebuild ;

rebuild: clean build ;

build: $(TARGET) ;

clean:
	$(RM) ./$(TARGET)
	$(RM) ./$(TARGET)-linux-x64
	$(RM) $(build_tmpdir)
	$(RM) $(srcdir)/node_modules
	$(RM) $(srcdir)/out
	$(RM) $(srcdir)/bin

install:
	$(INSTALL_PROGRAM) ./$(TARGET) $(DESTDIR)$(bindir)/$(TARGET)
	$(MKDIR) $(DESTDIR)$(libdir)
	$(CP) ./$(TARGET)-linux-x64 $(DESTDIR)$(libdir)
	$(INSTALL_DATA) $(srcdir)/desktop/$(TARGET).desktop $(DESTDIR)$(datadir)/applications/$(TARGET).desktop
	$(INSTALL_DATA) $(srcdir)/desktop/$(TARGET).svg $(DESTDIR)$(datadir)/icons/hicolor/scalable/apps/$(TARGET).svg

uninstall:
	$(RM) $(DESTDIR)$(bindir)/$(TARGET)
	$(RM) $(DESTDIR)$(libdir)/$(TARGET)-linux-x64
	$(RM) $(DESTDIR)$(datadir)/applications/$(TARGET).desktop
	$(RM) $(DESTDIR)$(datadir)/icons/hicolor/scalable/apps/$(TARGET).svg

$(TARGET): app
	install -m 755 $(srcdir)/launcher/$(TARGET).sh ./$(TARGET)

app: ocsmanager
	cd $(srcdir); \
		npm install; \
		npm run package
	cp -Rpf $(srcdir)/out/$(TARGET)-linux-x64 ./

ocsmanager:
	mkdir -p $(build_tmpdir)
	git clone https://github.com/opendesktop/ocs-manager.git -b release-$(ocsmanager_version) --single-branch --depth=1 $(build_tmpdir)/ocs-manager
	cd $(build_tmpdir)/ocs-manager; \
		sh ./scripts/import.sh; \
		qmake ./ocs-manager.pro; \
		make
	install -D -m 755 $(build_tmpdir)/ocs-manager/ocs-manager $(srcdir)/bin/ocs-manager
