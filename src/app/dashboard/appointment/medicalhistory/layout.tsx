import GlobalHeader from '@/components/global/global-header';
import React from 'react'

type Props = {
    children: React.ReactNode;
  };
  
const layout = ({  children }: Props) => {
  return (
    <div>
         <GlobalHeader/>
          <div>{children}</div>
     </div>
  )
}

export default layout