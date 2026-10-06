"use client";

import * as React from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Float,
  Environment,
  ContactShadows,
  RoundedBox,
  Html,
} from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  Vignette,
  ChromaticAberration,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";

/* ---------- RGB PC tower with cycling-color fans ---------- */
function RGBFan({ position, radius = 0.28 }: { position: [number, number, number]; radius?: number }) {
  const ref = React.useRef<THREE.Group>(null);
  const ringRef = React.useRef<THREE.Mesh>(null);
  const colorRef = React.useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    if (ref.current) ref.current.rotation.z = state.clock.elapsedTime * 6;
    if (colorRef.current) {
      const t = state.clock.elapsedTime;
      // cycle through RGB hues
      const r = 0.5 + 0.5 * Math.sin(t * 2);
      const g = 0.5 + 0.5 * Math.sin(t * 2 + 2.1);
      const b = 0.5 + 0.5 * Math.sin(t * 2 + 4.2);
      colorRef.current.emissive.setRGB(r, g, b);
      colorRef.current.color.setRGB(r, g, b);
    }
  });

  return (
    <group position={position}>
      {/* outer ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[radius, 0.03, 12, 32]} />
        <meshStandardMaterial color="#1a1a22" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* spinning blades */}
      <group ref={ref}>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <mesh
            key={i}
            rotation={[0, 0, (i / 8) * Math.PI * 2]}
            position={[
              Math.cos((i / 8) * Math.PI * 2) * radius * 0.55,
              Math.sin((i / 8) * Math.PI * 2) * radius * 0.55,
              0,
            ]}
          >
            <boxGeometry args={[radius * 0.9, 0.12, 0.02]} />
            <meshStandardMaterial
              ref={i === 0 ? colorRef : undefined}
              color="#ff3366"
              emissive="#ff3366"
              emissiveIntensity={2}
              toneMapped={false}
            />
          </mesh>
        ))}
      </group>
      {/* center hub */}
      <mesh>
        <cylinderGeometry args={[0.06, 0.06, 0.04, 16]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#222" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

function PCTower() {
  return (
    <group position={[1.15, 0.55, 0.1]} rotation={[0, -0.35, 0]}>
      {/* glass side panel (semi-transparent) */}
      <RoundedBox args={[0.7, 1.4, 0.85]} radius={0.04} smoothness={4}>
        <meshPhysicalMaterial
          color="#0a0a12"
          metalness={0.6}
          roughness={0.25}
          transmission={0.15}
          transparent
          opacity={0.92}
        />
      </RoundedBox>
      {/* RGB fans inside (visible through glass) */}
      <group position={[-0.42, 0.35, 0]}>
        <RGBFan position={[0, 0, 0]} />
        <RGBFan position={[0, -0.6, 0]} />
        <RGBFan position={[0, 0.6, 0]} />
      </group>
      {/* power button glow */}
      <mesh position={[0.36, 0.62, 0.43]}>
        <circleGeometry args={[0.03, 16]} />
        <meshStandardMaterial color="#00ffcc" emissive="#00ffcc" emissiveIntensity={3} toneMapped={false} />
      </mesh>
      {/* RGB strip along the edge */}
      <mesh position={[0.35, 0, 0.43]}>
        <boxGeometry args={[0.01, 1.3, 0.01]} />
        <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={2.5} toneMapped={false} />
      </mesh>
    </group>
  );
}

/* ---------- Monitor with code editor screen ---------- */
function Monitor() {
  // animated typing lines on screen
  const lines = [
    "import torch",
    "from transformers import AutoModel",
    "",
    "model = AutoModel.from_pretrained(",
    '    "bert-base-uncased"',
    ")",
    "outputs = model(**inputs)",
    "logits = outputs.logits",
    "preds = torch.argmax(logits, dim=-1)",
    "print(f'Accuracy: {acc:.4f}')",
  ];

  return (
    <group position={[-0.4, 0.95, 0]} rotation={[0, 0.18, 0]}>
      {/* stand neck */}
      <mesh position={[0, -0.45, 0]}>
        <boxGeometry args={[0.12, 0.5, 0.12]} />
        <meshStandardMaterial color="#1a1a22" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* stand base */}
      <mesh position={[0, -0.72, 0]}>
        <cylinderGeometry args={[0.28, 0.32, 0.04, 24]} />
        <meshStandardMaterial color="#15151c" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* monitor body */}
      <RoundedBox args={[2.3, 1.4, 0.08]} radius={0.03} smoothness={4}>
        <meshStandardMaterial color="#0d0d14" metalness={0.6} roughness={0.35} />
      </RoundedBox>
      {/* screen (emissive plane) */}
      <mesh position={[0, 0, 0.045]}>
        <planeGeometry args={[2.15, 1.25]} />
        <meshStandardMaterial
          color="#0a1018"
          emissive="#0a1018"
          emissiveIntensity={0.4}
          toneMapped={false}
        />
      </mesh>
      {/* code editor UI overlay */}
      <Html
        transform
        position={[0, 0, 0.05]}
        distanceFactor={1.6}
        style={{
          width: "430px",
          height: "250px",
          pointerEvents: "none",
          borderRadius: "4px",
          overflow: "hidden",
          background: "#0a1018",
          fontFamily: "ui-monospace, monospace",
          fontSize: "11px",
          padding: "10px 12px",
          boxShadow: "0 0 30px rgba(120,80,220,0.3) inset",
        }}
      >
        <div style={{ display: "flex", height: "100%" }}>
          {/* line numbers */}
          <div
            style={{
              color: "#3a3a55",
              paddingRight: "10px",
              textAlign: "right",
              userSelect: "none",
              lineHeight: "1.5",
            }}
          >
            {lines.map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>
          {/* code */}
          <div style={{ lineHeight: "1.5", whiteSpace: "pre" }}>
            {lines.map((l, i) => (
              <div
                key={i}
                style={{
                  color: l.startsWith("import") || l.startsWith("from")
                    ? "#c678dd"
                    : l.includes("=")
                    ? "#e5c07b"
                    : l.startsWith('"') || l.includes('"')
                    ? "#98c379"
                    : "#abb2bf",
                }}
              >
                {l || "\u00A0"}
              </div>
            ))}
          </div>
        </div>
      </Html>
      {/* brand glow at bottom */}
      <mesh position={[0, -0.66, 0.05]}>
        <circleGeometry args={[0.02, 16]} />
        <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={2} toneMapped={false} />
      </mesh>
    </group>
  );
}

/* ---------- Keyboard + mouse ---------- */
function Keyboard() {
  return (
    <group position={[-0.35, 0.16, 1.15]} rotation={[-0.05, 0.15, 0]}>
      <RoundedBox args={[1.5, 0.06, 0.5]} radius={0.02} smoothness={3}>
        <meshStandardMaterial color="#15151c" metalness={0.4} roughness={0.5} />
      </RoundedBox>
      {/* key grid */}
      {Array.from({ length: 5 }).map((_, row) =>
        Array.from({ length: 14 }).map((_, col) => (
          <mesh
            key={`${row}-${col}`}
            position={[-0.68 + col * 0.1, 0.05, -0.18 + row * 0.1]}
          >
            <boxGeometry args={[0.08, 0.03, 0.08]} />
            <meshStandardMaterial
              color="#0a0a12"
              emissive="#a855f7"
              emissiveIntensity={0.15 + ((row + col) % 3) * 0.1}
              toneMapped={false}
            />
          </mesh>
        ))
      )}
    </group>
  );
}

function Mouse() {
  return (
    <group position={[0.75, 0.1, 1.25]} rotation={[0, -0.2, 0]}>
      <mesh>
        <capsuleGeometry args={[0.09, 0.16, 8, 16]} />
        <meshStandardMaterial color="#15151c" metalness={0.4} roughness={0.4} />
      </mesh>
      {/* scroll wheel glow */}
      <mesh position={[0, 0.04, 0.08]}>
        <torusGeometry args={[0.02, 0.008, 8, 16]} />
        <meshStandardMaterial color="#00ffcc" emissive="#00ffcc" emissiveIntensity={2} toneMapped={false} />
      </mesh>
    </group>
  );
}

/* ---------- Desk surface ---------- */
function Desk() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0.4]} receiveShadow>
      <planeGeometry args={[8, 5]} />
      <meshStandardMaterial
        color="#0a0a10"
        metalness={0.5}
        roughness={0.6}
      />
    </mesh>
  );
}

/* ---------- Floating particles ---------- */
function Particles({ count = 40 }: { count?: number }) {
  const ref = React.useRef<THREE.Points>(null);
  const positions = React.useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 6;
      arr[i * 3 + 1] = Math.random() * 3 + 0.3;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.05;
      const pos = ref.current.geometry.attributes.position;
      for (let i = 0; i < count; i++) {
        const y = pos.getY(i);
        pos.setY(i, y + 0.003 > 3.5 ? 0.3 : y + 0.003);
      }
      pos.needsUpdate = true;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#a855f7"
        transparent
        opacity={0.6}
        sizeAttenuation
        toneMapped={false}
      />
    </points>
  );
}

/* ---------- Mouse-parallax rig (moves the whole scene group) ---------- */
function ParallaxRig({ children }: { children: React.ReactNode }) {
  const group = React.useRef<THREE.Group>(null);
  const { pointer } = useThree();
  const target = React.useRef({ x: 0, y: 0 });

  useFrame(() => {
    target.current.x = THREE.MathUtils.lerp(target.current.x, pointer.x * 0.25, 0.05);
    target.current.y = THREE.MathUtils.lerp(target.current.y, pointer.y * 0.12, 0.05);
    if (group.current) {
      group.current.rotation.y = target.current.x;
      group.current.rotation.x = -target.current.y;
    }
  });

  return <group ref={group}>{children}</group>;
}

/* ---------- The exported scene ---------- */
export function DeskScene3D() {
  return (
    <Canvas
      shadows
      dpr={[1, 1.8]}
      camera={{ position: [0, 1.6, 4.2], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      {/* lighting — 3-point cinematic */}
      <ambientLight intensity={0.18} />
      {/* purple key light (upper left) */}
      <spotLight
        position={[-3, 4, 2]}
        angle={0.6}
        penumbra={1}
        intensity={120}
        color="#a855f7"
        castShadow
      />
      {/* cyan fill light (lower right) */}
      <pointLight position={[3, 1, 2]} intensity={30} color="#06b6d4" />
      {/* pink rim near PC */}
      <pointLight position={[1.5, 1.2, -1]} intensity={25} color="#ec4899" />

      <ParallaxRig>
        <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.25}>
          <group position={[0, -0.3, 0]}>
            <Desk />
            <Monitor />
            <PCTower />
            <Keyboard />
            <Mouse />
            <Particles />
          </group>
        </Float>
      </ParallaxRig>

      <ContactShadows
        position={[0, -0.31, 0.4]}
        opacity={0.55}
        scale={9}
        blur={2.4}
        far={4}
        color="#000000"
      />
      <Environment preset="night" />

      <EffectComposer>
        <Bloom
          intensity={0.9}
          luminanceThreshold={0.25}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={[0.0006, 0.0006]}
        />
        <Vignette eskil={false} offset={0.3} darkness={0.85} />
      </EffectComposer>
    </Canvas>
  );
}
