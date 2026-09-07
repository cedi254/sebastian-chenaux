"use client";
import type { ImageLoaderProps } from "next/image";
export default function imageLoader({ src, width }: ImageLoaderProps) {
  return width <= 640 ? src.replace(/\.webp$/, "-640.webp") : src;
}
