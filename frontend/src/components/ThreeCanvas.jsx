import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeCanvas({ variant = "sphere" }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    let mesh;
    let particlesMesh;

    if (variant === "knot") {
      const geometry = new THREE.TorusKnotGeometry(1.2, 0.35, 128, 32);
      const material = new THREE.MeshStandardMaterial({
        color: 0x0d9488,
        wireframe: true,
        roughness: 0.2,
        metalness: 0.8,
      });
      mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
      scene.add(ambientLight);
      const pointLight = new THREE.PointLight(0x14b8a6, 3, 100);
      pointLight.position.set(5, 5, 5);
      scene.add(pointLight);
    } else {
      const particlesCount = 1200;
      const posArray = new Float32Array(particlesCount * 3);

      for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 8;
      }

      const particlesGeometry = new THREE.BufferGeometry();
      particlesGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(posArray, 3)
      );

      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.025,
        color: 0x14b8a6,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending,
      });

      particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particlesMesh);
    }

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth - 0.5) * 0.5;
      mouseY = (event.clientY / window.innerHeight - 0.5) * 0.5;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (mesh) {
        mesh.rotation.x = elapsedTime * 0.2;
        mesh.rotation.y = elapsedTime * 0.3;
        mesh.rotation.x += (mouseY - mesh.rotation.x) * 0.05;
        mesh.rotation.y += (mouseX - mesh.rotation.y) * 0.05;
      }

      if (particlesMesh) {
        particlesMesh.rotation.y = elapsedTime * 0.05;
        particlesMesh.rotation.x = elapsedTime * 0.03;
        particlesMesh.rotation.x += (mouseY - particlesMesh.rotation.x) * 0.05;
        particlesMesh.rotation.y += (mouseX - particlesMesh.rotation.y) * 0.05;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (container && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [variant]);

  return <div ref={mountRef} className="absolute inset-0 pointer-events-none z-0" />;
}
