import { useState } from "react";

export default function NavButtons(array: any) {

    let [pageNumber, setPageNumber] = useState(0);

    if (array.length > 4) {
        return (
            <div className='NavButtons'>
                {pageNumber > 0 && (<input type='button' className='NavButton' onClick={() => setPageNumber(pageNumber - 1)} value='<' />)}
                {pageNumber < array.length && (<input type='button' className='NavButton' onClick={() => setPageNumber(pageNumber + 1)} value='>' />)}
            </div>
        );
    }
}

