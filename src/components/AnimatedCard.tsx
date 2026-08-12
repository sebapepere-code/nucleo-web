import { ReactNode } from "react";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  featured?: boolean;
}

export default function AnimatedCard({ children, className = "", style = {}, featured = false }: AnimatedCardProps) {
  return (
    <div
      className={`animated-card ${featured ? "price-card-featured" : ""} ${className}`}
      style={{
        padding: "32px",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        ...style,
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        if (!featured) {
          el.style.transform = "translateY(-4px)";
          el.style.boxShadow = "0 8px 32px rgba(59, 130, 246, 0.15)";
        }
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        if (!featured) {
          el.style.transform = "";
          el.style.boxShadow = "";
        }
      }}
    >
      {children}
    </div>
  );
}
