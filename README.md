# VERTCON-web
A user-friendly implementation of the NGS VERTCON transformation from NGVD 1929 to NAVD 1988 vertical datums in the continental US. 

The [original VERTCON](http://www.ngs.noaa.gov/TOOLS/Vertcon/vertcon.html) is developed by the US National Geodetic Survey. The source for that version (2.1) is available [here](http://www.ngs.noaa.gov/PC_PROD/VERTCON/). The NGS's web tool is [here](http://www.ngs.noaa.gov/cgi-bin/VERTCON/vert_con.prl). The original VERTCON 2.1 README is included in this repository.

VERTCON represents the difference between the NAVD 1988 and NGVD 1929  datums. To go from NGVD29 -> NAVD88, add the value returned. To go from NAVD88 -> NGVD29, subtract the value. The value for a given point is bilinearly interpolated from the values of the surrounding cells.


