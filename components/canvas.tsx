"use client"
import { Tldraw } from 'tldraw'
import 'tldraw/tldraw.css'

export const Canvas = () => {
    return (
        <div
        style={{
          position: 'relative',
          width: '100%',
          height: '500px',
          overflow: 'hidden',
        }}
        className='mt-5'
         >
        <Tldraw />
      </div>
        )
}