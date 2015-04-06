# From user "Mike T" on gis.stackexchange.com (http://gis.stackexchange.com/users/1872/mike-t)
# http://gis.stackexchange.com/questions/7611/bilinear-interpolation-of-point-data-on-a-raster-in-python
# using the equations found at http://en.wikipedia.org/wiki/Bilinear_interpolation

from osgeo import gdal
from numpy import array
from numpy import floor, NAN

# Read raster
source = gdal.Open('vertcon_88-29.tif')
nx, ny = source.RasterXSize, source.RasterYSize
gt = source.GetGeoTransform()
band_array = source.GetRasterBand(1).ReadAsArray()
# Close raster
source = None

# Compute mid-point grid spacings
ax = array([gt[0] + ix*gt[1] + gt[1]/2.0 for ix in range(nx)])
ay = array([gt[3] + iy*gt[5] + gt[5]/2.0 for iy in range(ny)])

def bilinear(px, py, no_data=NAN):
    '''Bilinear interpolated point at (px, py) on band_array
    example: bilinear(2790501.920, 6338905.159)'''
    ny, nx = band_array.shape
    # Half raster cell widths
    hx = gt[1]/2.0
    hy = gt[5]/2.0
    # Calculate raster lower bound indices from point
    fx = (px - (gt[0] + hx))/gt[1]
    fy = (py - (gt[3] + hy))/gt[5]
    ix1 = int(floor(fx))
    iy1 = int(floor(fy))
    # Special case where point is on upper bounds
    if fx == float(nx - 1):
        ix1 -= 1
    if fy == float(ny - 1):
        iy1 -= 1
    # Upper bound indices on raster
    ix2 = ix1 + 1
    iy2 = iy1 + 1
    # Test array bounds to ensure point is within raster midpoints
    if (ix1 < 0) or (iy1 < 0) or (ix2 > nx - 1) or (iy2 > ny - 1):
        return no_data
    # Calculate differences from point to bounding raster midpoints
    dx1 = px - (gt[0] + ix1*gt[1] + hx)
    dy1 = py - (gt[3] + iy1*gt[5] + hy)
    dx2 = (gt[0] + ix2*gt[1] + hx) - px
    dy2 = (gt[3] + iy2*gt[5] + hy) - py
    # Use the differences to weigh the four raster values
    div = gt[1]*gt[5]
    return (band_array[iy1,ix1]*dx2*dy2/div +
            band_array[iy1,ix2]*dx1*dy2/div +
            band_array[iy2,ix1]*dx2*dy1/div +
            band_array[iy2,ix2]*dx1*dy1/div)
