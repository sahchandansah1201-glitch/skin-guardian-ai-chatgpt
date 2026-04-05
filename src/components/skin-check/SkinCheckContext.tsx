import { createContext, useContext, useState, type ReactNode } from "react";

interface SkinCheckContextType {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const SkinCheckContext = createContext<SkinCheckContextType | null>(null);

export function SkinCheckProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SkinCheckContext.Provider
      value={{
        isOpen,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
      }}
    >
      {children}
    </SkinCheckContext.Provider>
  );
}

export function useSkinCheck() {
  const ctx = useContext(SkinCheckContext);
  if (!ctx) throw new Error("useSkinCheck must be inside SkinCheckProvider");
  return ctx;
}
