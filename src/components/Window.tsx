import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Window } from "../type/windowType"
import React from "react"
import { faDownLeftAndUpRightToCenter, faUpRightAndDownLeftFromCenter } from "@fortawesome/free-solid-svg-icons"
import { PositionType } from "../type/positionType"
import { useAppStore } from "../data/store"
import { useOnClickOutside } from "../hooks/useClickOutside"

type Props = {
    window: Window 
}

const initPosition: PositionType = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
}

export default function WindowElement({
   window 
}: Props){
    const [position, setPosition] = React.useState<PositionType>(initPosition)
    const [prevSize, setPrevSize] = React.useState<PositionType>({
        x: 70,
        y: 70
    })
    const [isFullScreen, setIsFullScreen] = React.useState<boolean>(false)
    const [isClick, setIsClick] = React.useState(false)
    const [initialPosition, setInitalPosition] = React.useState<PositionType>({
        x: 0,
        y: 0
    })

    const windowMoveRef = React.useRef<HTMLElement>(null)
    const windowRef = React.useRef<HTMLElement>(null)

    const { windows, setWindow } = useAppStore()


    const reset = () => {
        if(!windowMoveRef.current) return

        setIsClick(false)
        setInitalPosition({x: 0, y:0})
    }

    const handleMouseDown = (mouse: React.MouseEvent<HTMLElement | MouseEvent>) => {
        if(isFullScreen || !windowRef.current || !windowMoveRef.current) return
        const mouseTarget = mouse.target as HTMLElement

        if(mouseTarget.childNodes.length !== 3 || mouseTarget.className === "window-header-name" || windowMoveRef.current){
            windowRef.current.style.zIndex = "999"
            windowMoveRef.current.style.transform = "unset"
             setIsClick(true)
             setInitalPosition({
            x: mouse.clientX,
            y: mouse.clientY
        })

        }

    }

    React.useEffect(() => {
        const handleMove = (mouse: MouseEvent) => {
            if(!windowMoveRef.current || !isClick) return;

            const position_offset: PositionType = {
                x: mouse.clientX -  initialPosition.x,
                y: mouse.clientY - initialPosition.y
            } 

            console.log(position_offset)

            setPosition({
                x: position.x + position_offset.x,
                y: position.y  + position_offset.y
            })

        }

        const handleMouseUp = () => {
            if(isClick) reset()
        }


        document.addEventListener("mouseup", handleMouseUp)
        document.addEventListener("mousemove", handleMove)

        return ()=>{
        document.removeEventListener("mouseup", handleMouseUp)
        document.removeEventListener("mousemove", handleMove)
        }
    }, [isClick, windowMoveRef])

    
    React.useEffect(() => {
        if(!windowRef.current) return

        if(isFullScreen){
            windowRef.current.style.width = "100vw"
            windowRef.current.style.height = "100vh"
            windowRef.current.style.transform = "unset"
            windowRef.current.style.top = "0"
            windowRef.current.style.left = "0"
            windowRef.current.style.zIndex = "999"
        }else{
            windowRef.current.style.width =  `${prevSize.x}vw`
            windowRef.current.style.height = `${prevSize.y}vh`
            if(position.x === initPosition.x && position.y === initPosition.y){
            windowRef.current.style.transform = "translate(-50%, -50%)"
            }
            windowRef.current.style.top = `${position.y}px`
            windowRef.current.style.left = `${position.x}px`
        }
    }, [isFullScreen, windowRef])


    return (
        <section ref={windowRef} className="window" style={{ top: `${position.y}px`, left: `${position.x}px`}}>
            <section onMouseDown={(e) => handleMouseDown(e)}  className="window-header" ref={windowMoveRef}>
                <div style={{width: "110px"}}></div>
                <p className="window-header-name">{window.name}</p>

                <div className="window-header-buttons">
                    <button className="minimize-button"></button>
                    <button className="fullscreen-button" onClick={() => setIsFullScreen(prev => !prev)}><FontAwesomeIcon icon={isFullScreen ? faUpRightAndDownLeftFromCenter : faDownLeftAndUpRightToCenter
                    } style={{width: "10px"}}/></button>
                    <button className="close-button" onClick={() => {
                        const remove_window = windows.filter(windowFil => windowFil.id !== window.id)

                        setWindow(remove_window)
                    }}></button>
                </div>
            </section>
        </section>
    )
}