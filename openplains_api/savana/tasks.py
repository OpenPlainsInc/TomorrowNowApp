###############################################################################
# Filename: tasks.py                                                           #
# Project: TomorrowNow                                                         #
# File Created: Monday March 28th 2022                                         #
# Author: Corey White (smortopahri@gmail.com)                                  #
# Maintainer: Corey White                                                      #
# -----                                                                        #
# Last Modified: Sat Oct 22 2022                                               #
# Modified By: Corey White                                                     #
# -----                                                                        #
# License: GPLv3                                                               #
#                                                                              #
# Copyright (c) 2022 TomorrowNow                                               #
#                                                                              #
# TomorrowNow is an open-source geospatial participartory modeling platform    #
# to enable stakeholder engagment in socio-environmental decision-makeing.     #
#                                                                              #
# This program is free software: you can redistribute it and/or modify         #
# it under the terms of the GNU General Public License as published by         #
# the Free Software Foundation, either version 3 of the License, or            #
# (at your option) any later version.                                          #
#                                                                              #
# This program is distributed in the hope that it will be useful,              #
# but WITHOUT ANY WARRANTY; without even the implied warranty of               #
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the                #
# GNU General Public License for more details.                                 #
#                                                                              #
# You should have received a copy of the GNU General Public License            #
# along with this program.  If not, see <https://www.gnu.org/licenses/>.       #
#                                                                              #
###############################################################################


from celery import shared_task
from .utils import actinia as acp
# from actinia import *
import requests
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync


# @shared_task()
# def ingest_futures_counties():


@shared_task()
def add(x, y):
    return x + y


@shared_task()
def asyncResourceStatus(user_id, resource_id, message_type="resource_message"):
    print(f"asyncResourceStatus: starting task {user_id}, {resource_id}")
    url = f"{acp.baseUrl()}/resources/{user_id}/{resource_id}"
    r = requests.get(url, auth=acp.auth())
    data = r.json()
    print(f"asyncResourceStatus: {r.status_code}")
    if r.status_code == 200:
        channel_layer = get_channel_layer()
        resource_name = resource_id.replace('-', '_')
        updated_status = data['status']
        resources = data['urls']['resources']
        process_log = []
        if data.get('process_log') is not None:
            process_log = data['process_log']

        resource_group = f"savana_{resource_name}"
        print(f"""
        asyncResourceStatus Data ----
        Resource Group Name: {resource_group}
        Updated Status: {updated_status}
        Resource Url: {resources}
        """)

        response_message = {
            "type": message_type,
            "message": updated_status,
            "resource_id": resource_id,
            "resources": resources,
            "process_log": process_log
        }

        return async_to_sync(channel_layer.group_send)(resource_group, response_message)


@shared_task()
def asyncModelUpdateResourceStatus(model_id, user_id, resource_id, message_type="model_setup"):
    print(f"asyncModelUpdateResourceStatus: starting task {user_id}, {resource_id}, {message_type}")
    url = f"{acp.baseUrl()}/resources/{user_id}/{resource_id}"
    r = requests.get(url, auth=acp.auth())
    data = r.json()
    print(f"asyncModelUpdateResourceStatus: {r.status_code}")
    if r.status_code == 200:
        channel_layer = get_channel_layer()
        resource_name = resource_id.replace('-', '_')
        updated_status = data['status']
        resources = data['urls']['resources']
        process_log = []
        if data.get('process_log') is not None:
            process_log = data['process_log']

        resource_group = f"savana_{resource_name}"

        response_message = {
            "model_id": model_id,
            "type": message_type,
            "message": updated_status,
            "resource_id": resource_id,
            "resources": resources,
            "process_log": process_log
        }

        return async_to_sync(channel_layer.group_send)(resource_group, response_message)


@shared_task()
def ingestData(modelId, mapset, geoids):
    print("Starting Ingest")
    url = f"{acp.baseUrl()}/locations/CONUS/mapsets/{mapset}/processing_async"

    # importer_list =  {
    #     "id": "importer_1",
    #     "module": "importer",
    #     "inputs": [
    #         {
    #             "import_descr": {
    #                 "source": "https://raw.githubusercontent.com/mmacata/pagestest/gh-pages/bonn.geojson",
    #                 "type": "vector"
    #             },
    #             "param": "map",
    #             "value": "polygon"
    #         },
    #         {
    #             "import_descr": {
    #                 "source": "{{ url_to_geojson_point }}",
    #                 "type": "vector"
    #             },
    #             "param": "map",
    #             "value": "point"
    #         }
    #     ]
    # }

    import_counties = {
        "module": "v.in.ogr",
        "flags": "",
        "id": f"v.in.ogr_{modelId}_{mapset}",
        "inputs": [
            {
                "param": "input",
                "value": "PG:host=db port=5432 dbname=actinia user=actinia password=actinia"
            },
            {
                "param": "layer",
                "value": "cb_2018_us_county_500k"
            },
            {
                "param": "where",
                "value": geoids
            },
            {
                "param": "location",
                "value": "cb_2018_us_county_500k"
            }
        ],
        "outputs": [
            {
                "param": "output",
                "value": "counties"
            }
        ]
    }

    reproject = {
        "module": "v.proj",
        "id": f"v.proj_{modelId}_{mapset}",
        "inputs": [
            {
                "param": "location",
                "value": "cb_2018_us_county_500k"
            },
            {
                "param": "mapset",
                "value": "PERMANENT"
            },
            {
                "param": "input",
                "value": "counties"
            },
            {
                "param": "smax",
                "value": "10000"
            }
        ]
    }

    add_counties_column = {
        "id": "v_db_addcol_1",
        "module": "v.db.addcolumn",
        "inputs": [
            {
                "param": "map",
                "value": "counties"
            },
            {
                "param": "columns",
                "value": "geoid_value int"
            }
        ]
    }

    populate_column = {
        "id": "v_db_update_1",
        "module": "v.db.update",
        "inputs": [
            {
                "param": "map",
                "value": "counties"
            },
            {
                "param": "column",
                "value": "geoid_value"
            },
            {
                "param": "query_column",
                "value": "geoid"
            }
        ]
    }

    counties_to_raster = {
        "module": "v.to.rast",
        "flags": "",
        "id": f"v.to.rast_{modelId}_{mapset}",
        "inputs": [
            {
                "param": "input",
                "value": f"counties"
            },
            {
                "param": "layer",
                "value": "1"
            },
            {
                "param": "type",
                "value": "area"
            },
            {
                "param": "use",
                # "value": "attr"
                "value": "val"
            },
            # {
            #     "param": "attribute_column",
            #     "value": "attr"
            # },
            {
                "param": "value",
                "value": "1"
            },
            {
                "param": "memory",
                "value": "3000"
            }
        ],
        "outputs": [
            {
                "param": "output",
                "value": "counties"
            }
        ]
    }

    set_region = {
        "module": "g.region",
        "id": f"g.region_{modelId}_{mapset}",
        "inputs": [
            {
                "param": "res",
                "value": "30"
            },
            {
                "param": "vector",
                "value": f"counties"
            }
        ]
    }

    set_region_aligned = {
        "module": "g.region",
        "id": f"g.region_align_{modelId}_{mapset}",
        "inputs": [
            {
                "param": "res",
                "value": "30"
            },
            {
                "param": "vector",
                "value": f"counties"
            },
            {
                "param": "align",
                "value": f"nlcd_2019_cog"
            }
        ]
    }

    import_protected_areas = {
        "module": "r.import",
        "id": "r.import_1804289383",
        "inputs": [
            {
                "param": "input",
                "value": "/vsicurl/https://storage.googleapis.com/tomorrownow-actinia-dev/SpatialData/PADUS3_0_Raster_CONUS_cog.tif"
            },
            {
                "param": "memory",
                "value": "10000"
            },
            {
                "param": "resample",
                "value": "nearest"
            },
            {
                "param": "extent",
                "value": "region"
            },
            {
                "param": "resolution",
                "value": "region"
            }
        ],
        "outputs": [
            {
                "param": "output",
                "value": "protected_areas"
            }
        ]
    }

    def importCOG(cog_name, year):
        return {
            "module": "r.import",
            "id": f"r.import_{cog_name}_{modelId}_{mapset}",
            "flags": "",
            "inputs": [
                {
                    "param": "input",
                    "value": f"/vsicurl/https://storage.googleapis.com/tomorrownow-actinia-dev/nlcd/{cog_name}.tif"
                },
                {
                    "param": "memory",
                    "value": "10000"
                },
                {
                    "param": "extent",
                    "value": "region"
                },
                {
                    "param": "resolution",
                    "value": "region"
                }
            ],
            "outputs": [
                {
                    "param": "output",
                    "value": cog_name
                }
            ]
        }

    grass_commands = [
        import_counties,
        reproject,
        set_region,
        importCOG("nlcd_2019_cog", "2019"),
        importCOG("nlcd_2016_cog", "2016"),
        importCOG("nlcd_2013_cog", "2013"),
        importCOG("nlcd_2011_cog", "2011"),
        importCOG("nlcd_2008_cog", "2008"),
        importCOG("nlcd_2006_cog", "2006"),
        importCOG("nlcd_2004_cog", "2004"),
        importCOG("nlcd_2001_cog", "2001"),
        set_region_aligned,
        add_counties_column,
        populate_column,
        counties_to_raster,
        import_protected_areas,
        {
            "module": "r.null",
            "id": "r.null_1804289383",
            "inputs": [
                {
                    "param": "map",
                    "value": "protected_areas"
                },
                {
                    "param": "null",
                    "value": "0"
                }
            ]
        },
        {
            "module": "r.mapcalc",
            "id": "r.mapcalc_1804289383",
            "inputs": [
                {
                    "param": "expression",
                    "value": "urban_2001 = if(nlcd_2001_cog >= 21 && nlcd_2001_cog <= 24, 1, if(nlcd_2001_cog == 11 || nlcd_2001_cog >= 90 || protected_areas, null(), 0))"
                },
                {
                    "param": "region",
                    "value": "current"
                }
            ]
        },
        {
            "module": "r.mapcalc",
            "id": "r.mapcalc_1804289383",
            "inputs": [
                {
                    "param": "expression",
                    "value": "urban_2004 = if(nlcd_2004_cog >= 21 && nlcd_2004_cog <= 24, 1, if(nlcd_2004_cog == 11 || nlcd_2004_cog >= 90 || protected_areas, null(), 0))"
                },
                {
                    "param": "region",
                    "value": "current"
                }
            ]
        },
        {
            "module": "r.mapcalc",
            "id": "r.mapcalc_1804289383",
            "inputs": [
                {
                    "param": "expression",
                    "value": "urban_2006 = if(nlcd_2006_cog >= 21 && nlcd_2006_cog <= 24, 1, if(nlcd_2006_cog == 11 || nlcd_2006_cog >= 90 || protected_areas, null(), 0))"
                },
                {
                    "param": "region",
                    "value": "current"
                }
            ]
        },
        {
            "module": "r.mapcalc",
            "id": "r.mapcalc_1804289383",
            "inputs": [
                {
                    "param": "expression",
                    "value": "urban_2008 = if(nlcd_2008_cog >= 21 && nlcd_2008_cog <= 24, 1, if(nlcd_2008_cog == 11 || nlcd_2008_cog >= 90 || protected_areas, null(), 0))"
                },
                {
                    "param": "region",
                    "value": "current"
                }
            ]
        },
        {
            "module": "r.mapcalc",
            "id": "r.mapcalc_1804289383",
            "inputs": [
                {
                    "param": "expression",
                    "value": "urban_2011 = if(nlcd_2011_cog >= 21 && nlcd_2011_cog <= 24, 1, if(nlcd_2011_cog == 11 || nlcd_2011_cog >= 90 || protected_areas, null(), 0))"
                },
                {
                    "param": "region",
                    "value": "current"
                }
            ]
        },
        {
            "module": "r.mapcalc",
            "id": "r.mapcalc_1804289383",
            "inputs": [
                {
                    "param": "expression",
                    "value": "urban_2013 = if(nlcd_2013_cog >= 21 && nlcd_2013_cog <= 24, 1, if(nlcd_2013_cog == 11 || nlcd_2013_cog >= 90 || protected_areas, null(), 0))"
                },
                {
                    "param": "region",
                    "value": "current"
                }
            ]
        },
        {
            "module": "r.mapcalc",
            "id": "r.mapcalc_1804289383",
            "inputs": [
                {
                    "param": "expression",
                    "value": "urban_2016 = if(nlcd_2016_cog >= 20 && nlcd_2016_cog <= 24, 1, if(nlcd_2016_cog == 11 || nlcd_2016_cog >= 90 || protected_areas, null(), 0))"
                },
                {
                    "param": "region",
                    "value": "current"
                }
            ]
        },
        {
            "module": "r.mapcalc",
            "id": "r.mapcalc_1804289383",
            "inputs": [
                {
                    "param": "expression",
                    "value": "urban_2019 = if(nlcd_2019_cog >= 20 && nlcd_2019_cog <= 24, 1, if(nlcd_2019_cog == 11 || nlcd_2019_cog >= 90 || protected_areas, null(), 0))"
                },
                {
                    "param": "region",
                    "value": "current"
                }
            ]
        },
        {
            "module": "v.to.rast",
            "id": "v.to.rast_1804289383",
            "inputs": [
                {
                    "param": "input",
                    "value": "counties"
                },
                {
                    "param": "layer",
                    "value": "1"
                },
                {
                    "param": "type",
                    "value": "area"
                },
                {
                    "param": "use",
                    "value": "val"
                },
                {
                    "param": "value",
                    "value": "1"
                },
                {
                    "param": "memory",
                    "value": "3000"
                }
            ],
            "outputs": [
                {
                    "param": "output",
                    "value": "counties"
                }
            ]
        },
        {
            "module": "r.null",
            "id": "r.null_1804289383",
            "inputs": [
                {
                    "param": "map",
                    "value": "protected_areas"
                },
                {
                    "param": "setnull",
                    "value": "0"
                }
            ]
        },
        {
            "module": "r.grow.distance",
            "id": "r.grow.distance_1804289383",
            "inputs": [
                {
                    "param": "input",
                    "value": "protected_areas"
                },
                {
                    "param": "metric",
                    "value": "euclidean"
                }
            ],
            "outputs": [
                {
                    "param": "distance",
                    "value": "dist_to_protected"
                }
            ]
        }
    ]

    pc = acp.create_actinia_process_chain(grass_commands)

    r = requests.post(
        url,
        auth=acp.auth(),
        json=pc,
        headers={"content-type": "application/json; charset=utf-8"}
    )
    
    jsonResponse = r.json()
    print(jsonResponse)
    asyncModelUpdateResourceStatus.delay(modelId, jsonResponse['user_id'], jsonResponse['resource_id'], message_type="model_setup")
