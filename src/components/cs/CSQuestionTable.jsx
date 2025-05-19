import React from 'react'

const CSQuestionTable = ({questions}) => {
    // const questions = [
    //     {id:1,category:"운영체제", content:"프로세스에 대해 설명하세요.", createdAt:"2024-05-13 12:00:00"},
    //     {id:2,category:"운영체제", content:"프로세스에 대해 설명하세요.", createdAt:"2024-05-14 12:00:00"},
    //     {id:3,category:"운영체제", content:"프로세스에 대해 설명하세요.", createdAt:"2024-05-15 12:00:00"},
    //     {id:4,category:"운영체제", content:"프로세스에 대해 설명하세요.", createdAt:"2024-05-16 12:00:00"},
    //     {id:5,category:"운영체제", content:"프로세스에 대해 설명하세요.", createdAt:"2024-05-17 12:00:00"},
    // ];
    if(!questions){
        return null;
    }
    const thStyle = 'font-medium py-10';
  return (
    <div>
        <table className='w-full'>
            <tr className='bg-secondary rounded-[5px] text-center'>
                <th className={`${thStyle} rounded-l-[5px] w-90`}>번호</th>
                <th className={`${thStyle} text-start`}>문제</th>
                <th className={thStyle}>날짜</th>
                <th className={`${thStyle} rounded-r-[5px]`}>정보</th>
            </tr>
            {questions.map(q=>{
                return(
                    <tr className='h-48 text-center border-b-1 border-gray-300'>
                        <td>{q.id}</td>
                        <td className='text-start'>{q.content}</td>
                        <td>{q.createdAt.substring(0,10)}</td>
                        <td className='flex justify-center items-center h-48'><p className='bg-gray-700 text-white w-48 h-28 flex justify-center items-center rounded-sm text-sm'>제출</p></td>
                    </tr>
                )
            })}
        </table>
    </div>
  )
}

export default CSQuestionTable