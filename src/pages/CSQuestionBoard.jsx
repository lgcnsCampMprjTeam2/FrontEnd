import React from 'react'
import CSQuestionTable from '../components/cs/CSQuestionTable'

const CSQuestionBoard = () => {
  return (
    <div>
        {/* 카테고리 필터링 */}
        <div></div>

        {/* 게시판 */}
        <div className='px-120'>
            <CSQuestionTable />
        </div>
    </div>
  )
}

export default CSQuestionBoard