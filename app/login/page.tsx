
import LoginButtons from "@/components/auth/LoginButtons"

export default function LoginPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="w-full max-w-sm p-8 space-y-6 bg-card border border-border rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-primary">Login</h1>
                    <p className="text-muted-foreground mt-2">Acesse a área de administração.</p>
                </div>
                <div className="flex flex-col items-center">
                   <LoginButtons session={null} />
                </div>
                 <p className="text-xs text-center text-muted-foreground">
                    Ao continuar, você concorda com nossos Termos de Serviço e Política de Privacidade.
                </p>
            </div>
        </div>
    )
}
