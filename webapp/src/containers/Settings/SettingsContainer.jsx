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

const calculateInputNodeLocation = (modX, modY, step, numInputs, xGap=300, yStep=100) => {
 
  let newX = modX - xGap
  const inputsEven = numInputs % 2 === 0;

  let newY = modY;
  let maxStep = 0;
  let stepIndex = []
  if (inputsEven) {
    const nodesPerSide = Math.ceil(numInputs / 2);
    maxStep = modY - (yStep * nodesPerSide);
    for (let i = 0; i < numInputs; i++) {
      let newStep = maxStep + (i * yStep) + (yStep/2)
      stepIndex.push(newStep)
    }   
  }
  else {
    let nodesPerSide = Math.ceil((numInputs - 1) / 2);
    maxStep = modY - (yStep * nodesPerSide);
    for (let i = 0; i < numInputs; i++) {
      let newStep = maxStep + (i * yStep)
      stepIndex.push(newStep)
    }    
  }

  newY = stepIndex[step - 1]  
  return { x: newX, y: newY }


}


const processChainToFlow = (processChainList) => {
  const nodes = [];
  const edges = [];
  let nodeId = 0;
  let xPos = 0;
  let yPos = 400;
  let recentNodeId = null;
  let lastOutputValue = null;
  let lastCurrentNodeIdModle = null;
  

  // Start creating flow graph
  for (let i = 0; i < processChainList.length; i++) {
    let pc = processChainList[i]
    let currentNodeIdModle = `${pc.module}-${nodeId.toString()}`
    console.log("START NODE:")
    console.log("Set: currentNodeIdModle as ", currentNodeIdModle)
    console.log("lastCurrentNodeIdModle", lastCurrentNodeIdModle)
    console.log("recentNodeId", recentNodeId)
    console.log('lastOutputValue: ', lastOutputValue)
    // Create a new row every time xpos is > 600
    if (xPos > 1600) {
      xPos = 0;
      yPos = yPos + 400;
    }
    else {
      if (i) {
        // Run only after first pass
        xPos = xPos + 400
      }
     
    }
    // Input Nodes
    let didOutPutConnectToInput = false;
    let numberOfInputs = pc.inputs.length
    for (let x = 0; x< numberOfInputs; x++) {
      let inputNodeId = `${currentNodeIdModle}-input-${pc.inputs[x].param}`
      let inputStyle = {
        background: '#D6D5E6',
      }
      let selectedInputStyle ={
        background: "#f0e3ce",
        borderColor: "#f6ab6c",
        borderWidth: 3
      }
      let inputNode = {
        id: inputNodeId,
        sourcePosition: 'right',
        targetPosition: 'top',
        position: calculateInputNodeLocation(xPos, yPos, x + 1, numberOfInputs),
        style: lastOutputValue === pc.inputs[x].value ? selectedInputStyle : inputStyle,
        data: {
          label: pc.inputs[x].param
        }
      }
      nodes.push(inputNode)

      // Input Edges
      // Connect output to input if needed
      if (lastOutputValue === pc.inputs[x].value) {
        didOutPutConnectToInput = true
        let inputEdgeId = `inputVarEdge-${recentNodeId}-${currentNodeIdModle}`
        edges.push({
          id: inputEdgeId,
          source: recentNodeId,
          target: inputNodeId,
          label: pc.inputs[x].value,
          type: xPos <= 1100 ? 'default' : 'step',
          style: {stroke: '#aaaaaa'},
          markerEnd: {
            type: MarkerType.ArrowClosed,
          }
        });
      } 
     
      // connect input to module
      let inputEdgeId = `inputEdge-${inputNodeId}`
        edges.push({
          id: inputEdgeId,
          source: inputNodeId,
          target: currentNodeIdModle,
          label: pc.inputs[x].value,
          // type: 'step',
          style: {
            stroke: '#f6ab6c'
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
          }
        });
      
    }

    if (!didOutPutConnectToInput && lastCurrentNodeIdModle !== currentNodeIdModle) {
       
      let noOutputEdgeId = `noOutputEdgeId-${lastCurrentNodeIdModle}-n${currentNodeIdModle}-${i}`
      console.log("noOutputEdgeId ", noOutputEdgeId)
      edges.push({
        id: noOutputEdgeId,
        source: lastCurrentNodeIdModle,
        target: currentNodeIdModle,
        label: `Step ${i}`,
        type: 'default',
        animated: true,
        style: { stroke: '#657e96', fontSize: "1.875em" },
        markerEnd: {
          type: MarkerType.ArrowClosed,
        }
      });
    }

    
    // Module Node
    xPos = xPos + 50
    let node = {
      id: currentNodeIdModle,
      sourcePosition: xPos <= 1100 ? 'right' : 'bottom',
      targetPosition: 'left',
      position: { x: xPos, y: yPos },
      data: {
        // label: pc.module,
        label: (
          <>
            <strong>{pc.module}</strong>
          </>
        ),
      }
    }
    
    lastCurrentNodeIdModle = currentNodeIdModle
    nodes.push(node)

    // Increase xpos no matter if output node is added.
    xPos = xPos + 250

    // console.log(`source: ${recentNodeId}, target: ${currentNodeId}, edgeId: ${currentNodeId}-${recentNodeId}`)
    if (recentNodeId && nodeId <= processChainList.length - 1) {
      

     
      recentNodeId = `${pc.module}-${nodeId.toString()}`;
   
      if (pc.outputs) {
        // Output Nodes
        // Add output nodes and edges if needed
        let numberOfOutputs = pc.outputs.length;
        
        
        for (let x = 0; x< numberOfOutputs; x++) {
          yPos = yPos + 150
          let outputNodeId = `${currentNodeIdModle}-output-${pc.outputs[x].param}`
          let outputNode = {
            id: outputNodeId,
            position: { x: xPos, y: yPos },
            sourcePosition: xPos <= 800 ? 'right' : 'bottom',
            targetPosition: 'left',
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
      else {
        lastOutputValue = null;
      }
      
    }
 
    if (!recentNodeId) {
      recentNodeId = currentNodeIdModle;
     
    }
    // Increase xpos no matter if output node is added.
    xPos = xPos + 200;
    nodeId++;
    console.log("END NODE")
  }

  return { nodes, edges }
}



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



export default function SettingsContainer() {
 
  const { nodes: initialNodesPc, edges: initialEdgesPc } = processChainToFlow(DEMO_PROCESS_CHAIN[0].list)
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodesPc);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdgesPc);
 
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);



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
