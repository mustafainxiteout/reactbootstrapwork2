import React,{useState} from 'react'
import HeaderComponent from './HeaderComponent'
import SidebarWithContent from './SidebarWithContent'

function Adminpage({navi}) {
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const handleButtonClick = () => {
    setIsButtonClicked(!isButtonClicked);
  };

  return (
    <section className='googlesans'>
            <HeaderComponent onButtonClick={handleButtonClick}/>
            <SidebarWithContent navs={navi} isButtonClicked={isButtonClicked}/>
    </section>
  )
}

export default Adminpage