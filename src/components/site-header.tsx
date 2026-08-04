import { Link } from "@tanstack/react-router";
import { site } from "@/content/site";
import { ShieldCheck } from "lucide-react";

// Public header by default — NO auth wired. Most sites need nothing here.
// To add accounts: create a `/login` route rendering <AuthForm/>
// ("@/components/auth-form"), then add a Sign-in <Link to="/login"> below,
// gated by useAuth() ("@/hooks/use-auth"). Those modules + the
// "@/integrations/neon/auth" client ship ready — they're just not imported.
export function SiteHeader() {
  return (
    <header className="mobile-header">
      <div className="mobile-brand"><span className="brand-mark"><ShieldCheck size={18} /></span><Link to="/">{site.name}</Link></div>
      <span className="mobile-demo">Demo-Modus</span>
    </header>
  );
}
