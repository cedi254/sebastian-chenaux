import * as THREE from 'three';
import {GLTFExporter} from 'three/examples/jsm/exporters/GLTFExporter.js';
import {mergeGeometries} from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import {mkdir,writeFile} from 'node:fs/promises';
globalThis.FileReader=class{readAsArrayBuffer(blob){blob.arrayBuffer().then(b=>{this.result=b;this.onloadend?.();});}readAsDataURL(blob){blob.arrayBuffer().then(b=>{this.result='data:application/octet-stream;base64,'+Buffer.from(b).toString('base64');this.onloadend?.();});}};
const group=new THREE.Group();group.name='SC_20KG_DUMBBELL';
const rubber=new THREE.MeshStandardMaterial({color:0x242424,roughness:.78,metalness:.12});
const metal=new THREE.MeshStandardMaterial({color:0xbababa,metalness:1,roughness:.28});
const inset=new THREE.MeshStandardMaterial({color:0x161616,roughness:.86,metalness:.03});
function mesh(geometry,material,x=0){const m=new THREE.Mesh(geometry,material);m.position.x=x;group.add(m);return m;}
const shape=new THREE.Shape();for(let i=0;i<6;i++){const a=Math.PI/6+i*Math.PI/3;const x=Math.cos(a)*.96,y=Math.sin(a)*.96;if(i)shape.lineTo(x,y);else shape.moveTo(x,y);}shape.closePath();
for(const sign of [-1,1]){const geo=new THREE.ExtrudeGeometry(shape,{depth:.58,bevelEnabled:true,bevelSegments:3,steps:1,bevelSize:.09,bevelThickness:.08,curveSegments:1});geo.center();geo.rotateY(Math.PI/2);mesh(geo,rubber,sign*1.19);const end=new THREE.CylinderGeometry(.7,.7,.014,6);end.rotateZ(Math.PI/2);mesh(end,inset,sign*1.572);for(const x of [.79,.84]){const collar=new THREE.CylinderGeometry(.24,.24,.07,40);collar.rotateZ(Math.PI/2);mesh(collar,metal,sign*x);}}
const handle=new THREE.CylinderGeometry(.155,.155,1.7,40);handle.rotateZ(Math.PI/2);mesh(handle,metal);
const grooves=[];for(let j=-1;j<=1;j+=2){for(let n=0;n<18;n++){const pts=[];for(let i=0;i<=90;i++){const x=-.7+i/90*1.4;const a=(i/90*5*Math.PI*j)+(n/18*Math.PI*2);pts.push(new THREE.Vector3(x,Math.sin(a)*.157,Math.cos(a)*.157));}const curve=new THREE.CatmullRomCurve3(pts);grooves.push(new THREE.TubeGeometry(curve,90,.006,3,false));}}
mesh(mergeGeometries(grooves),new THREE.MeshStandardMaterial({color:0x707070,metalness:1,roughness:.42}));
const exporter=new GLTFExporter();const result=await exporter.parseAsync(group,{binary:true});await mkdir('public/models',{recursive:true});await writeFile('public/models/dumbbell.glb',Buffer.from(result));console.log('Created dumbbell GLB:',result.byteLength,'bytes');


