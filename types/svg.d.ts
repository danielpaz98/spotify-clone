declare type StaticImageData = import("next/image").StaticImageData;

declare module "*.svg" {
  const ReactComponent: React.FC<React.SVGProps<SVGElement>>;
  export default ReactComponent;
}

declare module "*.svg?url" {
  const content: Omit<StaticImageData, "blurDataURL">;
  export default content;
}
