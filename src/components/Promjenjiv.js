import React, { useState, useImperativeHandle } from 'react'

const Promjenjiv = React.forwardRef((props, ref) => {
    const [vidljivo, postaviVidljivo] = useState(false)

    const sakrij = { display: vidljivo ? 'none' : '' }
    const prikazi = { display: vidljivo ? '' : 'none' }

    const promjenaVidljivosti = () => {
        postaviVidljivo(!vidljivo)
    }

    useImperativeHandle( ref, () =>{
        return {promjenaVidljivosti}
    })

    return (
        <div>
            <div style={sakrij}>
                <button onClick={promjenaVidljivosti}>
                    {props.natpis}
                </button>
            </div>
            <div style={prikazi}>
                {props.children}
                <button onClick={promjenaVidljivosti}>Odustani</button>
            </div>
        </div>
    )
})
export default Promjenjiv
