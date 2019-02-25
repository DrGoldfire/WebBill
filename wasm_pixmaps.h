#ifndef WASM_PIXMAPS_H
#define WASM_PIXMAPS_H

#define NUM_PIXMAPS 49

#include "pixmaps/about.xpm"
#include "pixmaps/apple.xpm"
#include "pixmaps/billA_0.xpm"
#include "pixmaps/billA_1.xpm"
#include "pixmaps/billA_2.xpm"
#include "pixmaps/billA_3.xpm"
#include "pixmaps/billA_4.xpm"
#include "pixmaps/billA_5.xpm"
#include "pixmaps/billA_6.xpm"
#include "pixmaps/billA_7.xpm"
#include "pixmaps/billA_8.xpm"
#include "pixmaps/billA_9.xpm"
#include "pixmaps/billA_10.xpm"
#include "pixmaps/billA_11.xpm"
#include "pixmaps/billA_12.xpm"
#include "pixmaps/billD_0.xpm"
#include "pixmaps/billD_1.xpm"
#include "pixmaps/billD_2.xpm"
#include "pixmaps/billD_3.xpm"
#include "pixmaps/billD_4.xpm"
#include "pixmaps/billL_0.xpm"
#include "pixmaps/billL_1.xpm"
#include "pixmaps/billL_2.xpm"
#include "pixmaps/billR_0.xpm"
#include "pixmaps/billR_1.xpm"
#include "pixmaps/billR_2.xpm"
#include "pixmaps/bsd.xpm"
#include "pixmaps/bsdcpu.xpm"
#include "pixmaps/bucket.xpm"
#include "pixmaps/hurd.xpm"
#include "pixmaps/icon.xpm"
#include "pixmaps/linux.xpm"
#include "pixmaps/logo.xpm"
#include "pixmaps/maccpu.xpm"
#include "pixmaps/next.xpm"
#include "pixmaps/nextcpu.xpm"
#include "pixmaps/os2.xpm"
#include "pixmaps/os2cpu.xpm"
#include "pixmaps/palm.xpm"
#include "pixmaps/palmcpu.xpm"
#include "pixmaps/redhat.xpm"
#include "pixmaps/sgi.xpm"
#include "pixmaps/sgicpu.xpm"
#include "pixmaps/spark_0.xpm"
#include "pixmaps/spark_1.xpm"
#include "pixmaps/sun.xpm"
#include "pixmaps/suncpu.xpm"
#include "pixmaps/toaster.xpm"
#include "pixmaps/wingdows.xpm"

static struct {
  const char * name;
  char ** pixmap;
} gPixmaps[] = {
  {"about", about_xpm},
  {"apple", apple_xpm},
  {"billA_0", billA_0_xpm},
  {"billA_1", billA_1_xpm},
  {"billA_2", billA_2_xpm},
  {"billA_3", billA_3_xpm},
  {"billA_4", billA_4_xpm},
  {"billA_5", billA_5_xpm},
  {"billA_6", billA_6_xpm},
  {"billA_7", billA_7_xpm},
  {"billA_8", billA_8_xpm},
  {"billA_9", billA_9_xpm},
  {"billA_10", billA_10_xpm},
  {"billA_11", billA_11_xpm},
  {"billA_12", billA_12_xpm},
  {"billD_0", billD_0_xpm},
  {"billD_1", billD_1_xpm},
  {"billD_2", billD_2_xpm},
  {"billD_3", billD_3_xpm},
  {"billD_4", billD_4_xpm},
  {"billL_0", billL_0_xpm},
  {"billL_1", billL_1_xpm},
  {"billL_2", billL_2_xpm},
  {"billR_0", billR_0_xpm},
  {"billR_1", billR_1_xpm},
  {"billR_2", billR_2_xpm},
  {"bsd", bsd_xpm},
  {"bsdcpu", bsdcpu_xpm},
  {"bucket", bucket_xpm},
  {"hurd", hurd_xpm},
  {"icon", icon_xpm},
  {"linux", linux_xpm},
  {"logo", logo_xpm},
  {"maccpu", maccpu_xpm},
  {"next", next_xpm},
  {"nextcpu", nextcpu_xpm},
  {"os2", os2_xpm},
  {"os2cpu", os2cpu_xpm},
  {"palm", palm_xpm},
  {"palmcpu", palmcpu_xpm},
  {"redhat", redhat_xpm},
  {"sgi", sgi_xpm},
  {"sgicpu", sgicpu_xpm},
  {"spark_0", spark_0_xpm},
  {"spark_1", spark_1_xpm},
  {"sun", sun_xpm},
  {"suncpu", suncpu_xpm},
  {"wingdows", wingdows_xpm},
  {"toaster", toaster_xpm}
};

#endif
