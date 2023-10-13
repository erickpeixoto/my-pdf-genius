import { ArrowRight, Loader2 } from 'lucide-react'
import { Button } from './ui/button'
import { Plans } from '@/lib/types'
import { RegisterLink } from '@kinde-oss/kinde-auth-nextjs/server'

type RegisterButtonProps = {
  planName: Plans
  isLoading?: boolean
}
const RegisterButton = ({ planName, isLoading }: RegisterButtonProps) => {

  const isExplorer = planName === "champion"

  return (
    <RegisterLink>
      <Button className={`${isExplorer ? `bg-gradient-to-r from-pink-500 to-purple-500 hover:to-purple-600 w-full`: `w-full` }`}>
        {isLoading &&  <Loader2 className='mr-4 h-4 w-4 animate-spin' />}
        Sign Up
        <ArrowRight className='h-5 w-5 ml-1.5' />
      </Button>
    </RegisterLink>
  )
}

export default RegisterButton
