import React from 'react';
import Svg, { Path, Ellipse, Circle, G, Rect } from 'react-native-svg';

interface PalaceSceneProps {
  width: number;
  height: number;
}

// Rajasthan Palace + Wedding Couple silhouette — teal monochrome
export default function PalaceScene({ width, height }: PalaceSceneProps) {
  const W = width;
  const H = height;
  const col = '#0A4A3C'; // deep teal for silhouette
  const colLight = '#3D9E8A'; // lighter teal for distant elements
  const colMid = '#1B7A6A';

  return (
    <Svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      {/* ── SKY HAZE / MIST ── */}
      {/* Large faint circles in background */}
      <Circle cx={W * 0.15} cy={H * 0.8} r={H * 0.55} fill="rgba(180,230,220,0.18)" />
      <Circle cx={W * 0.85} cy={H * 0.8} r={H * 0.55} fill="rgba(180,230,220,0.18)" />

      {/* ── GROUND STRIP ── */}
      <Rect x={0} y={H * 0.82} width={W} height={H * 0.18} fill={colLight} opacity={0.15} />

      {/* ══════════════════════════════════════════════
          LEFT PALACE COMPLEX
      ══════════════════════════════════════════════ */}

      {/* Far-left small tower */}
      <G opacity={0.45}>
        <Rect x={W*0.01} y={H*0.58} width={W*0.04} height={H*0.3} fill={colLight} />
        {/* Dome */}
        <Ellipse cx={W*0.03} cy={H*0.58} rx={W*0.025} ry={H*0.04} fill={colLight} />
        <Path d={`M${W*0.005},${H*0.58} Q${W*0.03},${H*0.50} ${W*0.055},${H*0.58}`} fill={colLight} />
      </G>

      {/* Left main palace block */}
      <G opacity={0.6}>
        {/* Base block */}
        <Rect x={W*0.02} y={H*0.6} width={W*0.22} height={H*0.27} fill={colMid} />
        {/* Arcade arches along base */}
        <Path d={`M${W*0.03},${H*0.87} L${W*0.03},${H*0.72} Q${W*0.045},${H*0.66} ${W*0.06},${H*0.72} L${W*0.06},${H*0.87}`} fill={col} />
        <Path d={`M${W*0.07},${H*0.87} L${W*0.07},${H*0.72} Q${W*0.085},${H*0.66} ${W*0.10},${H*0.72} L${W*0.10},${H*0.87}`} fill={col} />
        <Path d={`M${W*0.11},${H*0.87} L${W*0.11},${H*0.72} Q${W*0.125},${H*0.66} ${W*0.14},${H*0.72} L${W*0.14},${H*0.87}`} fill={col} />
        <Path d={`M${W*0.15},${H*0.87} L${W*0.15},${H*0.72} Q${W*0.165},${H*0.66} ${W*0.18},${H*0.72} L${W*0.18},${H*0.87}`} fill={col} />

        {/* Battlements top */}
        <Rect x={W*0.02} y={H*0.59} width={W*0.22} height={H*0.03} fill={colMid} />
        {[0.02,0.05,0.08,0.11,0.14,0.17,0.20].map((x,i)=>(
          <Rect key={i} x={W*x} y={H*0.55} width={W*0.024} height={H*0.045} fill={colMid} />
        ))}

        {/* Left center main dome */}
        <Rect x={W*0.06} y={H*0.46} width={W*0.1} height={H*0.15} fill={colMid} />
        <Ellipse cx={W*0.11} cy={H*0.46} rx={W*0.055} ry={H*0.055} fill={colMid} />
        <Path d={`M${W*0.055},${H*0.46} Q${W*0.11},${H*0.38} ${W*0.165},${H*0.46}`} fill={colMid} />
        {/* Spire */}
        <Rect x={W*0.106} y={H*0.34} width={W*0.008} height={H*0.06} fill={col} />
        <Ellipse cx={W*0.11} cy={H*0.34} rx={W*0.012} ry={H*0.015} fill={col} />

        {/* Left flanking tower */}
        <Rect x={W*0.02} y={H*0.5} width={W*0.04} height={H*0.15} fill={col} />
        <Path d={`M${W*0.02},${H*0.50} Q${W*0.04},${H*0.44} ${W*0.06},${H*0.50}`} fill={col} />
        <Rect x={W*0.035} y={H*0.40} width={W*0.008} height={H*0.05} fill={col} />

        {/* Right flanking tower */}
        <Rect x={W*0.18} y={H*0.5} width={W*0.04} height={H*0.15} fill={col} />
        <Path d={`M${W*0.18},${H*0.50} Q${W*0.20},${H*0.44} ${W*0.22},${H*0.50}`} fill={col} />
        <Rect x={W*0.195} y={H*0.40} width={W*0.008} height={H*0.05} fill={col} />
      </G>

      {/* ══════════════════════════════════════════════
          RIGHT PALACE COMPLEX (mirror)
      ══════════════════════════════════════════════ */}
      <G opacity={0.6}>
        <Rect x={W*0.76} y={H*0.6} width={W*0.22} height={H*0.27} fill={colMid} />
        <Path d={`M${W*0.77},${H*0.87} L${W*0.77},${H*0.72} Q${W*0.785},${H*0.66} ${W*0.80},${H*0.72} L${W*0.80},${H*0.87}`} fill={col} />
        <Path d={`M${W*0.81},${H*0.87} L${W*0.81},${H*0.72} Q${W*0.825},${H*0.66} ${W*0.84},${H*0.72} L${W*0.84},${H*0.87}`} fill={col} />
        <Path d={`M${W*0.85},${H*0.87} L${W*0.85},${H*0.72} Q${W*0.865},${H*0.66} ${W*0.88},${H*0.72} L${W*0.88},${H*0.87}`} fill={col} />
        <Path d={`M${W*0.89},${H*0.87} L${W*0.89},${H*0.72} Q${W*0.905},${H*0.66} ${W*0.92},${H*0.72} L${W*0.92},${H*0.87}`} fill={col} />
        <Rect x={W*0.76} y={H*0.59} width={W*0.22} height={H*0.03} fill={colMid} />
        {[0.76,0.79,0.82,0.85,0.88,0.91,0.94].map((x,i)=>(
          <Rect key={i} x={W*x} y={H*0.55} width={W*0.024} height={H*0.045} fill={colMid} />
        ))}
        <Rect x={W*0.84} y={H*0.46} width={W*0.1} height={H*0.15} fill={colMid} />
        <Ellipse cx={W*0.89} cy={H*0.46} rx={W*0.055} ry={H*0.055} fill={colMid} />
        <Path d={`M${W*0.835},${H*0.46} Q${W*0.89},${H*0.38} ${W*0.945},${H*0.46}`} fill={colMid} />
        <Rect x={W*0.886} y={H*0.34} width={W*0.008} height={H*0.06} fill={col} />
        <Ellipse cx={W*0.89} cy={H*0.34} rx={W*0.012} ry={H*0.015} fill={col} />
        <Rect x={W*0.76} y={H*0.5} width={W*0.04} height={H*0.15} fill={col} />
        <Path d={`M${W*0.76},${H*0.50} Q${W*0.78},${H*0.44} ${W*0.80},${H*0.50}`} fill={col} />
        <Rect x={W*0.775} y={H*0.40} width={W*0.008} height={H*0.05} fill={col} />
        <Rect x={W*0.94} y={H*0.5} width={W*0.04} height={H*0.15} fill={col} />
        <Path d={`M${W*0.94},${H*0.50} Q${W*0.96},${H*0.44} ${W*0.98},${H*0.50}`} fill={col} />
        <Rect x={W*0.955} y={H*0.40} width={W*0.008} height={H*0.05} fill={col} />
      </G>

      {/* Far right small tower */}
      <G opacity={0.45}>
        <Rect x={W*0.95} y={H*0.58} width={W*0.04} height={H*0.3} fill={colLight} />
        <Ellipse cx={W*0.97} cy={H*0.58} rx={W*0.025} ry={H*0.04} fill={colLight} />
        <Path d={`M${W*0.945},${H*0.58} Q${W*0.97},${H*0.50} ${W*0.995},${H*0.58}`} fill={colLight} />
      </G>

      {/* ══════════════════════════════════════════════
          WEDDING COUPLE SILHOUETTE (Centre)
      ══════════════════════════════════════════════ */}

      {/* GROOM (left of center) */}
      <G>
        {/* Body */}
        <Path
          d={`M${W*0.40},${H*1.02} L${W*0.38},${H*0.65} Q${W*0.415},${H*0.58} ${W*0.45},${H*0.65} L${W*0.44},${H*1.02}`}
          fill={col}
        />
        {/* Sherwani/Suit detail */}
        <Path
          d={`M${W*0.39},${H*0.80} Q${W*0.415},${H*0.75} ${W*0.44},${H*0.80}`}
          fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth={1}
        />
        {/* Arm reaching out to bride */}
        <Path
          d={`M${W*0.44},${H*0.72} Q${W*0.50},${H*0.70} ${W*0.52},${H*0.72}`}
          fill="none" stroke={col} strokeWidth={W*0.028}
          strokeLinecap="round"
        />
        {/* Head */}
        <Ellipse cx={W*0.415} cy={H*0.575} rx={W*0.028} ry={H*0.033} fill={col} />
        {/* Turban/Sehra */}
        <Path
          d={`M${W*0.385},${H*0.565} Q${W*0.415},${H*0.525} ${W*0.445},${H*0.565}`}
          fill={col}
        />
        <Ellipse cx={W*0.415} cy={H*0.555} rx={W*0.032} ry={H*0.018} fill={col} />
        {/* Turban top knot */}
        <Path
          d={`M${W*0.40},${H*0.545} Q${W*0.415},${H*0.52} ${W*0.43},${H*0.545}`}
          fill={col}
        />
        {/* Sehra strings (veil in front of groom's face) */}
        {[0,1,2,3].map((i)=>(
          <Path
            key={i}
            d={`M${W*(0.395+i*0.008)},${H*0.565} Q${W*(0.393+i*0.009)},${H*0.61} ${W*(0.396+i*0.008)},${H*0.64}`}
            fill="none"
            stroke={colMid}
            strokeWidth={0.8}
            opacity={0.6}
          />
        ))}
      </G>

      {/* BRIDE (right of center, slightly taller) */}
      <G>
        {/* Lehenga / wide skirt */}
        <Path
          d={`M${W*0.52},${H*0.65} Q${W*0.54},${H*0.78} ${W*0.62},${H*1.02} L${W*0.46},${H*1.02} Q${W*0.54},${H*0.78} ${W*0.56},${H*0.65}`}
          fill={col}
        />
        {/* Upper body */}
        <Path
          d={`M${W*0.50},${H*0.65} Q${W*0.54},${H*0.60} ${W*0.58},${H*0.65} L${W*0.56},${H*0.68} Q${W*0.54},${H*0.67} ${W*0.52},${H*0.68} Z`}
          fill={col}
        />
        {/* Head */}
        <Ellipse cx={W*0.54} cy={H*0.565} rx={W*0.026} ry={H*0.03} fill={col} />
        {/* Dupatta / veil over head */}
        <Path
          d={`M${W*0.50},${H*0.54} Q${W*0.54},${H*0.51} ${W*0.58},${H*0.54} L${W*0.60},${H*0.62} Q${W*0.54},${H*0.595} ${W*0.48},${H*0.60} Z`}
          fill={col}
          opacity={0.85}
        />
        {/* Flowing veil/dupatta trailing down */}
        <Path
          d={`M${W*0.57},${H*0.57} Q${W*0.65},${H*0.65} ${W*0.68},${H*0.82} Q${W*0.67},${H*0.88} ${W*0.64},${H*0.82} Q${W*0.62},${H*0.70} ${W*0.56},${H*0.63}`}
          fill={col}
          opacity={0.5}
        />
        {/* Arm extended to groom */}
        <Path
          d={`M${W*0.50},${H*0.66} Q${W*0.475},${H*0.695} ${W*0.455},${H*0.72}`}
          fill="none" stroke={col} strokeWidth={W*0.024}
          strokeLinecap="round"
        />
        {/* Bridal bun / hairstyle */}
        <Circle cx={W*0.545} cy={H*0.535} r={W*0.018} fill={col} />
      </G>

      {/* Clasped hands in center */}
      <Ellipse cx={W*0.487} cy={H*0.725} rx={W*0.018} ry={H*0.018} fill={colMid} />

      {/* Flower petals scattered on ground */}
      <Ellipse cx={W*0.35} cy={H*0.95} rx={W*0.025} ry={H*0.012} fill="rgba(255,255,255,0.25)" />
      <Ellipse cx={W*0.65} cy={H*0.93} rx={W*0.02} ry={H*0.01} fill="rgba(255,255,255,0.2)" />
      <Ellipse cx={W*0.28} cy={H*0.92} rx={W*0.015} ry={H*0.008} fill="rgba(255,255,255,0.15)" />
      <Ellipse cx={W*0.72} cy={H*0.96} rx={W*0.018} ry={H*0.009} fill="rgba(255,255,255,0.15)" />
    </Svg>
  );
}
