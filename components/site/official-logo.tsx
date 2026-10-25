import Image from "next/image";

/** Original SVG supplies both the accessible image and the unmodified silhouette. */
export function OfficialLogo({ className = "", priority = false, graphite = false }: { className?: string; priority?: boolean; graphite?: boolean }) {
  return <span className={`official-logo ${className}`}>
    <Image src={graphite ? "/brand/ZURY_Logo_Otimizada_Grafite.svg" : "/brand/ZURY_Logo_Otimizada_Branco.svg"} alt="ZURY CORRETORA" width={1046} height={324} priority={priority} />
  </span>;
}
