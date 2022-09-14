/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/containers/Settings/SettingsContainer.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Friday, April 8th 2022, 3:00:20 pm
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */


/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/containers/Home/HomeContainer.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Wednesday, March 30th 2022, 1:39:57 am
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */

import React, { useMemo, useCallback } from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType
} from 'react-flow-renderer';
import { useEffect } from "react";
import { xhr } from "ol/featureloader";



const DEMO_PROCESS_CHAIN = [
  {
    "list": [
      {
        "id": "g.region_1804289",
        "inputs": [
          {
            "param": "res",
            "value": "30"
          },
          {
            "param": "n",
            "value": "1575229.8682478906"
          },
          {
            "param": "e",
            "value": "1512752.4250321393"
          },
          {
            "param": "s",
            "value": "1558707.5566250077"
          },
          {
            "param": "w",
            "value": "1497717.362558638"
          }
        ],
        "module": "g.region"
      },
      {
        "flags": "",
        "id": "r.import_usgs30m_cog",
        "inputs": [
          {
            "param": "input",
            "value": "/vsicurl/https://prd-tnm.s3.amazonaws.com/StagedProducts/Elevation/1/TIFF/USGS_Seamless_DEM_1.vrt"
          },
          {
            "param": "resample",
            "value": "bilinear"
          },
          {
            "param": "memory",
            "value": "10000"
          },
          {
            "param": "extent",
            "value": "region"
          }
        ],
        "module": "r.import",
        "outputs": [
          {
            "param": "output",
            "value": "usgs_3dep_30m"
          }
        ]
      },
      {
        "id": "r.watershed_usgs_3dep_30",
        "inputs": [
          {
            "param": "elevation",
            "value": "usgs_3dep_30m"
          },
          {
            "param": "drainage",
            "value": "usgs_3dep_30m_direction"
          },
          {
            "param": "memory",
            "value": "10000"
          }
        ],
        "module": "r.watershed"
      },
      {
        "flags": "b",
        "id": "r.circle_1804289383",
        "inputs": [
          {
            "param": "coordinates",
            "value": "1509177.14689642,1565747.6175040225"
          },
          {
            "param": "max",
            "value": "200"
          }
        ],
        "module": "r.circle",
        "outputs": [
          {
            "param": "output",
            "value": "circle"
          }
        ]
      },
      {
        "flags": "c",
        "id": "r.stream.basins_1804289382",
        "inputs": [
          {
            "param": "direction",
            "value": "usgs_3dep_30m_direction"
          },
          {
            "param": "stream_rast",
            "value": "circle"
          },
          {
            "param": "memory",
            "value": "10000"
          }
        ],
        "module": "r.stream.basins",
        "outputs": [
          {
            "param": "basins",
            "value": "point_basin"
          }
        ]
      },
      {
        "id": "r.to.vect_1804289383",
        "inputs": [
          {
            "param": "input",
            "value": "point_basin"
          },
          {
            "param": "type",
            "value": "area"
          },
          {
            "param": "column",
            "value": "value"
          }
        ],
        "module": "r.to.vect",
        "outputs": [
          {
            "param": "output",
            "value": "point_basin_cloud"
          }
        ]
      },
      {
        "id": "r.mask",
        "inputs": [
          {
            "param": "raster",
            "value": "point_basin"
          },
          {
            "param": "maskcats",
            "value": "*"
          },
          {
            "param": "layer",
            "value": "1"
          }
        ],
        "module": "r.mask"
      },
      {
        "flags": "",
        "id": "r.import_nlcd_2001_cog",
        "inputs": [
          {
            "param": "input",
            "value": "/vsicurl/https://storage.googleapis.com/tomorrownow-actinia-dev/nlcd/nlcd_2001_cog.tif"
          },
          {
            "param": "memory",
            "value": "10000"
          },
          {
            "param": "extent",
            "value": "region"
          }
        ],
        "module": "r.import",
        "outputs": [
          {
            "param": "output",
            "value": "nlcd_2001_cog"
          }
        ]
      },
      {
        "flags": "acpl",
        "id": "r.stats_2001",
        "inputs": [
          {
            "param": "input",
            "value": "nlcd_2001_cog"
          },
          {
            "param": "separator",
            "value": "|"
          },
          {
            "param": "null_value",
            "value": "*"
          },
          {
            "param": "nsteps",
            "value": "255"
          }
        ],
        "module": "r.stats"
      },
      {
        "flags": "",
        "id": "r.import_nlcd_2004_cog",
        "inputs": [
          {
            "param": "input",
            "value": "/vsicurl/https://storage.googleapis.com/tomorrownow-actinia-dev/nlcd/nlcd_2004_cog.tif"
          },
          {
            "param": "memory",
            "value": "10000"
          },
          {
            "param": "extent",
            "value": "region"
          }
        ],
        "module": "r.import",
        "outputs": [
          {
            "param": "output",
            "value": "nlcd_2004_cog"
          }
        ]
      },
      {
        "flags": "acpl",
        "id": "r.stats_2004",
        "inputs": [
          {
            "param": "input",
            "value": "nlcd_2004_cog"
          },
          {
            "param": "separator",
            "value": "|"
          },
          {
            "param": "null_value",
            "value": "*"
          },
          {
            "param": "nsteps",
            "value": "255"
          }
        ],
        "module": "r.stats"
      },
      {
        "flags": "",
        "id": "r.import_nlcd_2006_cog",
        "inputs": [
          {
            "param": "input",
            "value": "/vsicurl/https://storage.googleapis.com/tomorrownow-actinia-dev/nlcd/nlcd_2006_cog.tif"
          },
          {
            "param": "memory",
            "value": "10000"
          },
          {
            "param": "extent",
            "value": "region"
          }
        ],
        "module": "r.import",
        "outputs": [
          {
            "param": "output",
            "value": "nlcd_2006_cog"
          }
        ]
      },
      {
        "flags": "acpl",
        "id": "r.stats_2006",
        "inputs": [
          {
            "param": "input",
            "value": "nlcd_2006_cog"
          },
          {
            "param": "separator",
            "value": "|"
          },
          {
            "param": "null_value",
            "value": "*"
          },
          {
            "param": "nsteps",
            "value": "255"
          }
        ],
        "module": "r.stats"
      },
      {
        "flags": "",
        "id": "r.import_nlcd_2008_cog",
        "inputs": [
          {
            "param": "input",
            "value": "/vsicurl/https://storage.googleapis.com/tomorrownow-actinia-dev/nlcd/nlcd_2008_cog.tif"
          },
          {
            "param": "memory",
            "value": "10000"
          },
          {
            "param": "extent",
            "value": "region"
          }
        ],
        "module": "r.import",
        "outputs": [
          {
            "param": "output",
            "value": "nlcd_2008_cog"
          }
        ]
      },
      {
        "flags": "acpl",
        "id": "r.stats_2008",
        "inputs": [
          {
            "param": "input",
            "value": "nlcd_2008_cog"
          },
          {
            "param": "separator",
            "value": "|"
          },
          {
            "param": "null_value",
            "value": "*"
          },
          {
            "param": "nsteps",
            "value": "255"
          }
        ],
        "module": "r.stats"
      },
      {
        "flags": "",
        "id": "r.import_nlcd_2011_cog",
        "inputs": [
          {
            "param": "input",
            "value": "/vsicurl/https://storage.googleapis.com/tomorrownow-actinia-dev/nlcd/nlcd_2011_cog.tif"
          },
          {
            "param": "memory",
            "value": "10000"
          },
          {
            "param": "extent",
            "value": "region"
          }
        ],
        "module": "r.import",
        "outputs": [
          {
            "param": "output",
            "value": "nlcd_2011_cog"
          }
        ]
      },
      {
        "flags": "acpl",
        "id": "r.stats_2011",
        "inputs": [
          {
            "param": "input",
            "value": "nlcd_2011_cog"
          },
          {
            "param": "separator",
            "value": "|"
          },
          {
            "param": "null_value",
            "value": "*"
          },
          {
            "param": "nsteps",
            "value": "255"
          }
        ],
        "module": "r.stats"
      },
      {
        "flags": "",
        "id": "r.import_nlcd_2013_cog",
        "inputs": [
          {
            "param": "input",
            "value": "/vsicurl/https://storage.googleapis.com/tomorrownow-actinia-dev/nlcd/nlcd_2013_cog.tif"
          },
          {
            "param": "memory",
            "value": "10000"
          },
          {
            "param": "extent",
            "value": "region"
          }
        ],
        "module": "r.import",
        "outputs": [
          {
            "param": "output",
            "value": "nlcd_2013_cog"
          }
        ]
      },
      {
        "flags": "acpl",
        "id": "r.stats_2013",
        "inputs": [
          {
            "param": "input",
            "value": "nlcd_2013_cog"
          },
          {
            "param": "separator",
            "value": "|"
          },
          {
            "param": "null_value",
            "value": "*"
          },
          {
            "param": "nsteps",
            "value": "255"
          }
        ],
        "module": "r.stats"
      },
      {
        "flags": "",
        "id": "r.import_nlcd_2016_cog",
        "inputs": [
          {
            "param": "input",
            "value": "/vsicurl/https://storage.googleapis.com/tomorrownow-actinia-dev/nlcd/nlcd_2016_cog.tif"
          },
          {
            "param": "memory",
            "value": "10000"
          },
          {
            "param": "extent",
            "value": "region"
          }
        ],
        "module": "r.import",
        "outputs": [
          {
            "param": "output",
            "value": "nlcd_2016_cog"
          }
        ]
      },
      {
        "flags": "acpl",
        "id": "r.stats_2016",
        "inputs": [
          {
            "param": "input",
            "value": "nlcd_2016_cog"
          },
          {
            "param": "separator",
            "value": "|"
          },
          {
            "param": "null_value",
            "value": "*"
          },
          {
            "param": "nsteps",
            "value": "255"
          }
        ],
        "module": "r.stats"
      },
      {
        "flags": "",
        "id": "r.import_nlcd_2019_cog",
        "inputs": [
          {
            "param": "input",
            "value": "/vsicurl/https://storage.googleapis.com/tomorrownow-actinia-dev/nlcd/nlcd_2019_cog.tif"
          },
          {
            "param": "memory",
            "value": "10000"
          },
          {
            "param": "extent",
            "value": "region"
          }
        ],
        "module": "r.import",
        "outputs": [
          {
            "param": "output",
            "value": "nlcd_2019_cog"
          }
        ]
      },
      {
        "flags": "acpl",
        "id": "r.stats_2019",
        "inputs": [
          {
            "param": "input",
            "value": "nlcd_2019_cog"
          },
          {
            "param": "separator",
            "value": "|"
          },
          {
            "param": "null_value",
            "value": "*"
          },
          {
            "param": "nsteps",
            "value": "255"
          }
        ],
        "module": "r.stats"
      },
      {
        "flags": "t",
        "id": "r.univar_3dep_30m",
        "inputs": [
          {
            "param": "map",
            "value": "usgs_3dep_30m"
          },
          {
            "param": "separator",
            "value": "|"
          }
        ],
        "module": "r.univar"
      },
      {
        "id": "v.out.ogr_1804289383",
        "inputs": [
          {
            "param": "input",
            "value": "point_basin_cloud"
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
            "param": "format",
            "value": "PostgreSQL"
          },
          {
            "param": "output_type",
            "value": ""
          },
          {
            "param": "dsco",
            "value": ""
          },
          {
            "param": "lco",
            "value": ""
          }
        ],
        "module": "v.out.ogr",
        "outputs": [
          {
            "param": "output",
            "value": "PG:host=db port=5432 dbname=actinia user=actinia password=actinia"
          }
        ]
      }
    ],
    "version": "1"
  }
]


const processChainToFlow = (processChainList) => {
  const nodes = [];
  const edges = [];
  let nodeId = 0;
  let xPos = 0;
  let yPos = 250;
  let recentNodeId = null;
  let lastOutputValue = null;

  for (let i = 0; i < processChainList.length; i++) {
    let pc = processChainList[i]
    let currentNodeIdModle = `${pc.module}-${nodeId.toString()}`

    // Input Nodes
    let numberOfInputs = pc.inputs.length
    for (let x = 0; x< numberOfInputs; x++) {
      let inputNodeId = `${currentNodeIdModle}-input-${pc.inputs[x].param}`
      let inputNode = {
        id: inputNodeId,
        sourcePosition: 'right',
        targetPosition: 'left',
        position: { x: xPos - 200, y: (yPos - 20) * ((x + 1)/numberOfInputs)},
        style: { background: '#D6D5E6' },
        data: {
          label: pc.inputs[x].param
        }
      }
      nodes.push(inputNode)

      // Input Edges

      // Connect output to input if needed
      if (lastOutputValue === pc.inputs[x].value) {
        let inputEdgeId = `inputVarEdge-${recentNodeId}-${currentNodeIdModle}`
        edges.push({
          id: inputEdgeId,
          source: recentNodeId,
          target: inputNodeId,
          label: pc.inputs[x].value,
          type: 'step',
          style: {stroke: '#aaaaaa'},
          markerEnd: {
            type: MarkerType.ArrowClosed,
          }
        });
      }
      else {
        // if (recentNodeId) {
        //   let moduleToModuleEdgeId = `moduleToModule-${recentNodeId}-${currentNodeIdModle}`
        //   edges.push({
        //     id: moduleToModuleEdgeId,
        //     source: recentNodeId,
        //     target: currentNodeIdModle,
        //     style: {stroke: '#fff'},
        //     markerEnd: {
        //       type: MarkerType.ArrowClosed,
        //     }
        //   });
        // }
        
      }

      // connect input to module
      let inputEdgeId = `inputEdge-${inputNodeId}`


        edges.push({
          id: inputEdgeId,
          source: inputNodeId,
          target: currentNodeIdModle,
          label: pc.inputs[x].value,
          type: 'step',
          style: {stroke: '#f6ab6c'},
          markerEnd: {
            type: MarkerType.ArrowClosed,
          }
        });
      
    }
    
    // Module Node
    let node = {
      id: currentNodeIdModle,
      sourcePosition: 'right',
      targetPosition: 'left',
      position: { x: xPos, y: yPos },
      data: {
        label: pc.module
      }
    }
    if (xPos + 250 > 3000) {
      yPos = yPos + 300;
      xPos = 0;
    }
    else {
      xPos = xPos + 300;
    }

    
    nodes.push(node)

    

    // console.log(`source: ${recentNodeId}, target: ${currentNodeId}, edgeId: ${currentNodeId}-${recentNodeId}`)
    if (recentNodeId && nodeId <= processChainList.length - 1) {
      

      // Add output nodes and edges if needed
      recentNodeId = `${pc.module}-${nodeId.toString()}`;
      if (pc.outputs) {
        // Output Nodes
        let numberOfOutputs = pc.outputs.length;
        xPos = xPos + 200;
        for (let x = 0; x< numberOfOutputs; x++) {
          let outputNodeId = `${currentNodeIdModle}-output-${pc.outputs[x].param}`
          let outputNode = {
            id: outputNodeId,
            position: { x: xPos, y: (yPos - 50) * ((x + 1)/numberOfOutputs)},
            sourcePosition: 'top',
            targetPosition: 'right',
            style: { background: "#657e96"},
            data: {
              label: pc.outputs[x].value
            }
          }
          lastOutputValue = pc.outputs[x].value
          nodes.push(outputNode)

          // Output Edges
          let outputEdgeId = `outputEdge-${outputNodeId}`
          edges.push({
            id: outputEdgeId,
            source: currentNodeIdModle,
            target: outputNodeId,
            type: 'step',
            label: pc.outputs[x].param,
            style: { stroke: '#657e96' },
            markerEnd: {
              type: MarkerType.ArrowClosed,
            }
          });
          recentNodeId = outputNodeId;
        }
        
      }
      

      
    }
    if (!recentNodeId) {
      recentNodeId = `${pc.module}-${nodeId.toString()}`;
    }

    nodeId++;
  }

  return { nodes, edges }
}



const initialNodes = [
  {
    id: '1',
    type: 'default',
    data: {
      label: (
        <>
          <strong>Processes Chain</strong>
        </>
      ),
    },
    position: { x: 250, y: 0 },
  },
  // {
  //   id: '2',
  //   data: {
  //     label: (
  //       <>
  //         Setting Computational Region
  //       </>
  //     ),
  //   },
  //   position: { x: 100, y: 100 },
  // },
  // {
  //   id: '3',
  //   data: {
  //     label: (
  //       <>
  //         Gathering 3dep 1 arc-second elevation data
  //       </>
  //     ),
  //   },
  //   position: { x: 400, y: 100 },
  //   style: {
  //     background: '#D6D5E6',
  //     color: '#333',
  //     border: '1px solid #222138',
  //     width: 180,
  //   },
  // },
  // {
  //   id: '4',
  //   position: { x: 250, y: 200 },
  //   data: {
  //     label: 'Downloading NLCD data',
  //   },
  // },
  // {
  //   id: '5',
  //   data: {
  //     label: 'Calculating Flow Direction',
  //   },
  //   position: { x: 250, y: 325 },
  // },
  // {
  //   id: '6',
  //   type: 'output',
  //   data: {
  //     label: (
  //       <>
  //         Calculating Upstream <strong>Basin</strong>
  //       </>
  //     ),
  //   },
  //   position: { x: 100, y: 480 },
  // },
  // {
  //   id: '7',
  //   type: 'output',
  //   data: { label: 'Another output node' },
  //   position: { x: 400, y: 450 },
  // },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', label: 'init' },
  { id: 'e1-3', source: '1', target: '3' },
  {
    id: 'e3-4',
    source: '3',
    target: '4',
    animated: true,
    label: 'download in progress',
  },
  {
    id: 'e4-5',
    source: '4',
    target: '5',
    label: '',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: 'e5-6',
    source: '5',
    target: '6',
    type: 'smoothstep',
    label: 'smooth step edge',
  },
  // {
  //   id: 'e5-7',
  //   source: '5',
  //   target: '7',
  //   type: 'step',
  //   style: { stroke: '#f6ab6c' },
  //   label: 'a step edge',
  //   animated: true,
  //   labelStyle: { fill: '#f6ab6c', fontWeight: 700 },
  // },
];


const onInit = (reactFlowInstance) => console.log('flow loaded:', reactFlowInstance);
/**
 * Task for Anna
 * 1. Add a button
 * 
 */
// const initialNodesPc = processChainToNodes(DEMO_PROCESS_CHAIN[0].list.slice(0,5))
// console.log("initialNodesPc", initialNodesPc)
// const initialEdgesPc = processChainToEdges(DEMO_PROCESS_CHAIN[0].list.slice(0,5))
// console.log("initialEdgesPc", initialEdgesPc)

const { nodes: initialNodesPc, edges: initialEdgesPc } = processChainToFlow(DEMO_PROCESS_CHAIN[0].list)
console.log("initialNodesPc", initialNodesPc)
console.log("initialEdgesPc", initialEdgesPc)

export default function SettingsContainer() {
  // const initialNodesPc = useMemo(() => processChainToNodes(DEMO_PROCESS_CHAIN[0].list.slice(0,5)), [])
  // console.log("initialNodesPc", initialNodesPc)
  // const initialEdgesPc = useMemo(() => processChainToEdges(DEMO_PROCESS_CHAIN[0].list.slice(0,5)), [])
  // console.log("initialEdgesPc", initialEdgesPc)
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodesPc);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdgesPc);
 
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);


    // useEffect(() => {
    //   setNodes(initialNodesPc)
    //   setEdges(initialEdgesPc)
    // }, [initialNodesPc, initialEdgesPc, setNodes, setEdges]);

    return (
     
       <Container fluid style={{ padding: "1rem 0" }} className="vh-100 d-flex flex-column">
         {/* <header>
          <h2>Settings</h2>
         </header> */}
          <Row className="h-100">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={onInit}
              fitView
              attributionPosition="top-right"
          >
      <MiniMap
        nodeStrokeColor={(n) => {
          if (n.style?.background) return n.style.background;
          if (n.type === 'input') return '#0041d0';
          if (n.type === 'output') return '#ff0072';
          if (n.type === 'default') return '#1a192b';

          return '#eee';
        }}
        nodeColor={(n) => {
          if (n.style?.background) return n.style.background;

          return '#fff';
        }}
        nodeBorderRadius={2}
      />
      <Controls />
      <Background color="#aaa" gap={16} />
    </ReactFlow>
          </Row>
        </Container>
  
    );
  }
