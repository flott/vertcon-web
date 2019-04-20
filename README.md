# VERTCON+

## Project background
A user-friendly implementation of the NGS VERTCON transformation from NGVD 1929 to NAVD 1988 vertical datums in the contiguous United States. 

The [VERTCON](http://www.ngs.noaa.gov/TOOLS/Vertcon/vertcon.html) model was developed by the US National Geodetic Survey. The source for that version (2.1) is available [here](http://www.ngs.noaa.gov/PC_PROD/VERTCON/). The NGS's web tool is [here](http://www.ngs.noaa.gov/cgi-bin/VERTCON/vert_con.prl). The original VERTCON 2.1 README is included in this repository. 

VERTCON represents the difference between the NAVD 1988 and NGVD 1929  datums. This value varies over the country, which the original developers represented in a 3-minute grid across the country. The value for a given point is bilinearly interpolated from the values of the surrounding cells. While the grid is slightly larger than the contiguous US, values outside the US should not be considered valid.

## Running the app
Clone the repo and navigate to the directory.

Set up a virtual environment:
`virtualenv venv`
or
`python3 -m venv ./venv`

Install the packages:
`pip install -r requirements.txt`

And run with either
`python3 app.py` (for debug mode)
or 
`gunicorn app:app` (for production mode)
