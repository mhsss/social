import React, {useState} from "react";
import cn from 'classnames'
import s from "../common/Paginator.module.css"

type PropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (PageNumber: number) => void
    portionSize?: number
}

let Paginator: React.FC<PropsType> = ({totalItemsCount,pageSize,currentPage,onPageChanged,portionSize =10}) => {

    let pagesCount = Math.ceil(totalItemsCount / pageSize);
    let pages: Array<number> = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount/portionSize)
    let [portionNumber,setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portionNumber -1) * portionSize +1
    let rightPortionPageNumber = portionNumber * portionSize


    return <div>
        {portionNumber > 1 && <button onClick={() => {
            setPortionNumber(portionNumber - 1)
        }} > PREV </button>}

        {/*    pages.map(p => {*/}
        {/*    return <span key={p} onClick={() => {*/}
        {/*        props.onPageChanged(p)*/}
        {/*    }} className={props.currentPage === p && s.selectedPage}>{p}</span>*/}
        {/*})}*/}

            { pages.filter (p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map(p => {
                return <span
                    className={
                        cn({
                            [s.selectedPage]: currentPage === p}
                        )}
                    key={p} onClick={() => {
                    onPageChanged(p)
                }} >{p}</span>
            })}

        {portionCount > portionNumber && <button onClick={() => {
            setPortionNumber(portionNumber + 1)
        }} > NEXT </button>}
        </div>
}

export default Paginator
