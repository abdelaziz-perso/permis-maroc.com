import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Transpile Three.js packages for smooth SSR / client loading
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
};

export default nextConfig;
