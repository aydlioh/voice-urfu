import { UIProvider} from './UIProvider'

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <UIProvider>
      {children}
    </UIProvider>
  )
}
