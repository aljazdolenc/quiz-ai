import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar.tsx";

interface Props {
  src?: string;
  fallback?: string;
  className?: string;
}

export function MessageAvatar({ src, fallback, className, }: Props) {
  return (
    <Avatar className={className}>
      <AvatarImage src={src} alt="Avatar"/>
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  )
}
