'use client';

import { useEffect, useRef } from 'react';

export default function ThreeCanvas() {
  const containerRef = useRef(null);

  useEffect(() => {
    let animationFrameId;
    let scene, camera, renderer, particles, geometry, material;

    const initThree = async () => {
      try {
        const THREE = await import('three');
        if (!containerRef.current) return;

        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
        camera.position.z = 30;

        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        containerRef.current.appendChild(renderer.domElement);

        // Elegant particle torus knot / subtle floating mesh
        const particleCount = 450;
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        const color1 = new THREE.Color('#4F46E5');
        const color2 = new THREE.Color('#0284C7');

        for (let i = 0; i < particleCount; i++) {
          const t = i * 0.1;
          const x = (10 + Math.sin(t * 2)) * Math.cos(t) * 0.8;
          const y = (10 + Math.sin(t * 2)) * Math.sin(t) * 0.8;
          const z = Math.cos(t * 3) * 4;

          positions[i * 3] = x + (Math.random() - 0.5) * 4;
          positions[i * 3 + 1] = y + (Math.random() - 0.5) * 4;
          positions[i * 3 + 2] = z + (Math.random() - 0.5) * 4;

          const mixedColor = color1.clone().lerp(color2, Math.random());
          colors[i * 3] = mixedColor.r;
          colors[i * 3 + 1] = mixedColor.g;
          colors[i * 3 + 2] = mixedColor.b;
        }

        geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        // Soft round particle texture
        const canvas = document.createElement('canvas');
        canvas.width = 16;
        canvas.height = 16;
        const ctx = canvas.getContext('2d');
        const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
        grad.addColorStop(0, 'rgba(79, 70, 229, 0.8)');
        grad.addColorStop(1, 'rgba(79, 70, 229, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(8, 8, 8, 0, Math.PI * 2);
        ctx.fill();

        const texture = new THREE.CanvasTexture(canvas);

        material = new THREE.PointsMaterial({
          size: 0.5,
          vertexColors: true,
          map: texture,
          transparent: true,
          opacity: 0.35, // Low subtle opacity so text is 100% crisp and readable
          blending: THREE.NormalBlending,
        });

        particles = new THREE.Points(geometry, material);
        scene.add(particles);

        let mouseX = 0;
        let mouseY = 0;

        const handleMouseMove = (event) => {
          mouseX = (event.clientX / window.innerWidth) * 2 - 1;
          mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        };

        window.addEventListener('mousemove', handleMouseMove);

        const handleResize = () => {
          if (!containerRef.current || !renderer || !camera) return;
          const w = containerRef.current.clientWidth;
          const h = containerRef.current.clientHeight;
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        };

        window.addEventListener('resize', handleResize);

        const animate = () => {
          animationFrameId = requestAnimationFrame(animate);

          if (particles) {
            particles.rotation.y += 0.0015;
            particles.rotation.x += 0.0008;

            particles.rotation.y += mouseX * 0.002;
            particles.rotation.x += mouseY * 0.002;
          }

          renderer.render(scene, camera);
        };

        animate();

        return () => {
          window.removeEventListener('mousemove', handleMouseMove);
          window.removeEventListener('resize', handleResize);
          cancelAnimationFrame(animationFrameId);
          if (containerRef.current && renderer.domElement) {
            containerRef.current.removeChild(renderer.domElement);
          }
        };
      } catch (e) {
        console.warn('Three.js canvas initialization skipped:', e);
      }
    };

    initThree();
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute right-0 top-0 w-full sm:w-1/2 h-full pointer-events-none z-0 opacity-40 overflow-hidden"
    />
  );
}
