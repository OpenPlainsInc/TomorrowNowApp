# Create STAC Catalog
from pystac_client import Client
from google.cloud import storage

def createCollection(root, catalog_name, desc):
    return None

def collectionSpatialTemporalExtent():
    north = 3267405
    west = -2362395
    south = 221265
    east = 2327655
    # sp_extent = pystac.SpatialExtent([None,None,None,None])
    # start_date = datetime.strptime('2001-01-01', '%Y-%m-%d')
    # end_data = datetime.strptime('2019-01-01', '%Y-%m-%d')
    # temporal_extent = pystac.TemporalExtent([(start_date, end_data)])
    # extent = pystac.Extent(sp_extent, temporal_extent)
   
    
op_catalog.add_child(lclu)

def __main__:
    # Create RootSTAC Catalog (openplains)
    op_catalog = pystac.Catalog(id = "openplains", description= "STAC collection containing data used by OpenPlains.")
    
    # Create LCLU STAC Catalog
    lclu = pystac.Catalog(id = "lclu", description="A catalog containing land cover land use data collections")
    
    # Create NLCD STAC Collection
    nlcd = pystac.Collection(id='nlcd', description = 'NLCD datasets 2001 - 2019', extent = extent)
    lclu.add_child(nlcd)
    
    # Add LCLC STAC Catalog to Root OPCatalog
    op_catalog.add_child(lclu)
    
    # Create geomorphology STAC Catalog and add to root
    geomorphology = pystac.Catalog(id = "lclu", description="A catalog containing geomorphological data collections")
    op_catalog.add_child(geomorphology)
    
    # Create transportation STAC Catalog and add to root
    transportation = pystac.Catalog(id = "transportation", description="A catalog containing transportation data collections")
    op_catalog.add_child(transportation)
    