import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/style.css';

const QuestionBoard = () => {
  const { number } = useParams();
  const [questionInfo, setQuestionInfo] = useState(null);

  const [comments, setComments] = useState([
    { text: '안녕하세요! 첫 번째 댓글입니다.', author: 'User1' },
    { text: '이 기능 정말 유용하네요.', author: 'User2' },
    { text: '좋은 하루 보내세요 :)', author: 'User3' }
  ]);
  const [input, setInput] = useState('');

  const exampleData = {
    '1': {
      title: 'TCP/IP 기본',
      author: '홍길동',
      subject: '네트워크',
      problemNumber: '1',
      date: '2025-05-16',
      content: '',
    },
    '2': {
      title: 'SQL 조인',
      author: '김철수',
      subject: '데이터베이스',
      problemNumber: '2',
      date: '2025-05-15',
      content: '',
    },
    '3': {
      title: '프로세스와 스레드',
      author: '이영희',
      subject: '운영체제',
      problemNumber: '3',
      date: '2025-05-14',
      content: '',
    },
    '4': {
      title: '이진트리 순회',
      author: '박민수',
      subject: '자료구조',
      problemNumber: '4',
      date: '2025-05-13',
      content: '',
    },
    '5': {
      title: '라우팅 개념',
      author: '홍길동',
      subject: '네트워크',
      problemNumber: '5',
      date: '2025-05-12',
      content: '',
    },
    '6': {
      title: '인덱스 최적화',
      author: '김철수',
      subject: '데이터베이스',
      problemNumber: '6',
      date: '2025-05-11',
      content: '',
    },
    '7': {
      title: '메모리 관리',
      author: '이영희',
      subject: '운영체제',
      problemNumber: '7',
      date: '2025-05-10',
      content: '',
    },
    '8': {
      title: '스택과 큐',
      author: '박민수',
      subject: '자료구조',
      problemNumber: '8',
      date: '2025-05-09',
      content: '',
    },
    '9': {
      title: 'TCP 연결 설정',
      author: '홍길동',
      subject: '네트워크',
      problemNumber: '9',
      date: '2025-05-08',
      content: '',
    },
    '10': {
      title: '트랜잭션 개념',
      author: '김철수',
      subject: '데이터베이스',
      problemNumber: '10',
      date: '2025-05-07',
      content: '',
    },
    '11': {
      title: '스레드 동기화',
      author: '이영희',
      subject: '운영체제',
      problemNumber: '11',
      date: '2025-05-06',
      content: '',
    },
    '12': {
      title: '그래프 탐색',
      author: '박민수',
      subject: '자료구조',
      problemNumber: '12',
      date: '2025-05-05',
      content: '',
    },
    '13': {
      title: 'IP 주소 체계',
      author: '홍길동',
      subject: '네트워크',
      problemNumber: '13',
      date: '2025-05-04',
      content: '',
    },
    '14': {
      title: '조인 유형',
      author: '김철수',
      subject: '데이터베이스',
      problemNumber: '14',
      date: '2025-05-03',
      content: '',
    },
    '15': {
      title: '프로세스 스케줄링',
      author: '이영희',
      subject: '운영체제',
      problemNumber: '15',
      date: '2025-05-02',
      content: '',
    },
    '16': {
      title: '이진 탐색 트리',
      author: '박민수',
      subject: '자료구조',
      problemNumber: '16',
      date: '2025-05-01',
      content: '',
    },
    '17': {
      title: 'UDP 프로토콜',
      author: '홍길동',
      subject: '네트워크',
      problemNumber: '17',
      date: '2025-04-30',
      content: '',
    },
    '18': {
      title: '데이터 정규화',
      author: '김철수',
      subject: '데이터베이스',
      problemNumber: '18',
      date: '2025-04-29',
      content: '',
    },
    '19': {
      title: '가상 메모리',
      author: '이영희',
      subject: '운영체제',
      problemNumber: '19',
      date: '2025-04-28',
      content: '',
    },
    '20': {
      title: '힙 자료구조',
      author: '박민수',
      subject: '자료구조',
      problemNumber: '20',
      date: '2025-04-27',
      content: '',
    },
    '21': {
      title: '네트워크 보안',
      author: '홍길동',
      subject: '네트워크',
      problemNumber: '21',
      date: '2025-04-26',
      content: '',
    },
    '22': {
      title: '뷰와 인덱스',
      author: '김철수',
      subject: '데이터베이스',
      problemNumber: '22',
      date: '2025-04-25',
      content: '',
    },
    '23': {
      title: '파일 시스템',
      author: '이영희',
      subject: '운영체제',
      problemNumber: '23',
      date: '2025-04-24',
      content: '',
    },
    '24': {
      title: '해시 테이블',
      author: '박민수',
      subject: '자료구조',
      problemNumber: '24',
      date: '2025-04-23',
      content: '',
    },
    '25': {
      title: 'DNS 이해',
      author: '홍길동',
      subject: '네트워크',
      problemNumber: '25',
      date: '2025-04-22',
      content: '',
    },
    '26': {
      title: '복제 및 백업',
      author: '김철수',
      subject: '데이터베이스',
      problemNumber: '26',
      date: '2025-04-21',
      content: '',
    },
    '27': {
      title: '교착 상태',
      author: '이영희',
      subject: '운영체제',
      problemNumber: '27',
      date: '2025-04-20',
      content: '',
    },
    '28': {
      title: '트라이 구조',
      author: '박민수',
      subject: '자료구조',
      problemNumber: '28',
      date: '2025-04-19',
      content: '',
    },
    '29': {
      title: '패킷 스위칭',
      author: '홍길동',
      subject: '네트워크',
      problemNumber: '29',
      date: '2025-04-18',
      content: '',
    },
    '30': {
      title: '쿼리 튜닝',
      author: '김철수',
      subject: '데이터베이스',
      problemNumber: '30',
      date: '2025-04-17',
      content: '',
    },
    '31': {
      title: '시그널 처리',
      author: '이영희',
      subject: '운영체제',
      problemNumber: '31',
      date: '2025-04-16',
      content: '',
    },
    '32': {
      title: '링크드 리스트',
      author: '박민수',
      subject: '자료구조',
      problemNumber: '32',
      date: '2025-04-15',
      content: '',
    },
    '33': {
      title: '서브넷 마스크',
      author: '홍길동',
      subject: '네트워크',
      problemNumber: '33',
      date: '2025-04-14',
      content: '',
    },
    '34': {
      title: '데이터 무결성',
      author: '김철수',
      subject: '데이터베이스',
      problemNumber: '34',
      date: '2025-04-13',
      content: '',
    },
    '35': {
      title: '입출력 관리',
      author: '이영희',
      subject: '운영체제',
      problemNumber: '35',
      date: '2025-04-12',
      content: '',
    },
    '36': {
      title: 'AVL 트리',
      author: '박민수',
      subject: '자료구조',
      problemNumber: '36',
      date: '2025-04-11',
      content: '',
    },
    '37': {
      title: '방화벽 원리',
      author: '홍길동',
      subject: '네트워크',
      problemNumber: '37',
      date: '2025-04-10',
      content: '',
    },
    '38': {
      title: '인덱스 설계',
      author: '김철수',
      subject: '데이터베이스',
      problemNumber: '38',
      date: '2025-04-09',
      content: '',
    },
    '39': {
      title: '캐시 메모리',
      author: '이영희',
      subject: '운영체제',
      problemNumber: '39',
      date: '2025-04-08',
      content: '',
    },
    '40': {
      title: '큐 자료구조',
      author: '박민수',
      subject: '자료구조',
      problemNumber: '40',
      date: '2025-04-07',
      content: '',
    },
    '41': {
      title: 'IPv6 주소 체계',
      author: '홍길동',
      subject: '네트워크',
      problemNumber: '41',
      date: '2025-04-06',
      content: '',
    },
    '42': {
      title: 'NoSQL 소개',
      author: '김철수',
      subject: '데이터베이스',
      problemNumber: '42',
      date: '2025-04-05',
      content: '',
    },
    '43': {
      title: '스케줄링 알고리즘',
      author: '이영희',
      subject: '운영체제',
      problemNumber: '43',
      date: '2025-04-04',
      content: '',
    },
    '44': {
      title: '그래프 최단 경로',
      author: '박민수',
      subject: '자료구조',
      problemNumber: '44',
      date: '2025-04-03',
      content: '',
    },
    '45': {
      title: 'HTTP/2 프로토콜',
      author: '홍길동',
      subject: '네트워크',
      problemNumber: '45',
      date: '2025-04-02',
      content: '',
    },
    '46': {
      title: '트랜잭션 격리 수준',
      author: '김철수',
      subject: '데이터베이스',
      problemNumber: '46',
      date: '2025-04-01',
      content: '',
    },
    '47': {
      title: '가상화 기술',
      author: '이영희',
      subject: '운영체제',
      problemNumber: '47',
      date: '2025-03-31',
      content: '',
    },
    '48': {
      title: '힙 정렬',
      author: '박민수',
      subject: '자료구조',
      problemNumber: '48',
      date: '2025-03-30',
      content: '',
    },
    '49': {
      title: '라우팅 프로토콜',
      author: '홍길동',
      subject: '네트워크',
      problemNumber: '49',
      date: '2025-03-29',
      content: '',
    },
    '50': {
      title: '정규화 단계',
      author: '김철수',
      subject: '데이터베이스',
      problemNumber: '50',
      date: '2025-03-28',
      content: '',
    },
    '51': {
      title: '세마포어',
      author: '이영희',
      subject: '운영체제',
      problemNumber: '51',
      date: '2025-03-27',
      content: '',
    },
    '52': {
      title: '트라이 구현',
      author: '박민수',
      subject: '자료구조',
      problemNumber: '52',
      date: '2025-03-26',
      content: '',
    },
    '53': {
      title: '패킷 필터링',
      author: '홍길동',
      subject: '네트워크',
      problemNumber: '53',
      date: '2025-03-25',
      content: '',
    },
    '54': {
      title: '인덱스 유형',
      author: '김철수',
      subject: '데이터베이스',
      problemNumber: '54',
      date: '2025-03-24',
      content: '',
    },
    '55': {
      title: '프로세스 생성과 종료',
      author: '이영희',
      subject: '운영체제',
      problemNumber: '55',
      date: '2025-03-23',
      content: '',
    },
    '56': {
      title: '그래프 표현법',
      author: '박민수',
      subject: '자료구조',
      problemNumber: '56',
      date: '2025-03-22',
      content: '',
    },
    '57': {
      title: 'DHCP 원리',
      author: '홍길동',
      subject: '네트워크',
      problemNumber: '57',
      date: '2025-03-21',
      content: '',
    },
    '58': {
      title: 'ER 모델링',
      author: '김철수',
      subject: '데이터베이스',
      problemNumber: '58',
      date: '2025-03-20',
      content: '',
    },
    '59': {
      title: '페이지 교체 알고리즘',
      author: '이영희',
      subject: '운영체제',
      problemNumber: '59',
      date: '2025-03-19',
      content: '',
    },
    '60': {
      title: '이진 탐색',
      author: '박민수',
      subject: '자료구조',
      problemNumber: '60',
      date: '2025-03-18',
      content: '',
    },
    '61': {
      title: 'ARP 프로토콜',
      author: '홍길동',
      subject: '네트워크',
      problemNumber: '61',
      date: '2025-03-17',
      content: '',
    },
    '62': {
      title: '동시성 제어',
      author: '김철수',
      subject: '데이터베이스',
      problemNumber: '62',
      date: '2025-03-16',
      content: '',
    },
    '63': {
      title: '인터럽트 처리',
      author: '이영희',
      subject: '운영체제',
      problemNumber: '63',
      date: '2025-03-15',
      content: '',
    },
    '64': {
      title: '순환 연결 리스트',
      author: '박민수',
      subject: '자료구조',
      problemNumber: '64',
      date: '2025-03-14',
      content: '',
    },
    '65': {
      title: '포트 번호',
      author: '홍길동',
      subject: '네트워크',
      problemNumber: '65',
      date: '2025-03-13',
      content: '',
    },
    '66': {
      title: '샤딩 기술',
      author: '김철수',
      subject: '데이터베이스',
      problemNumber: '66',
      date: '2025-03-12',
      content: '',
    },
    '67': {
      title: '동기화 기법',
      author: '이영희',
      subject: '운영체제',
      problemNumber: '67',
      date: '2025-03-11',
      content: '',
    },
    '68': {
      title: '덱 자료구조',
      author: '박민수',
      subject: '자료구조',
      problemNumber: '68',
      date: '2025-03-10',
      content: '',
    },
    '69': {
      title: 'TCP 혼잡 제어',
      author: '홍길동',
      subject: '네트워크',
      problemNumber: '69',
      date: '2025-03-09',
      content: '',
    },
    '70': {
      title: '데이터 웨어하우스',
      author: '김철수',
      subject: '데이터베이스',
      problemNumber: '70',
      date: '2025-03-08',
      content: '',
    },
    '71': {
      title: '메모리 단편화',
      author: '이영희',
      subject: '운영체제',
      problemNumber: '71',
      date: '2025-03-07',
      content: '',
    },
    '72': {
      title: '비트맵',
      author: '박민수',
      subject: '자료구조',
      problemNumber: '72',
      date: '2025-03-06',
      content: '',
    },
    '73': {
      title: 'DNS 시스템',
      author: '홍길동',
      subject: '네트워크',
      problemNumber: '73',
      date: '2025-03-05',
      content: '',
    },
    '74': {
      title: '백업 전략',
      author: '김철수',
      subject: '데이터베이스',
      problemNumber: '74',
      date: '2025-03-04',
      content: '',
    },
    '75': {
      title: '컨텍스트 스위칭',
      author: '이영희',
      subject: '운영체제',
      problemNumber: '75',
      date: '2025-03-03',
      content: '',
    },
    '76': {
      title: '스택 구현',
      author: '박민수',
      subject: '자료구조',
      problemNumber: '76',
      date: '2025-03-02',
      content: '',
    },
    '77': {
      title: 'SSL/TLS',
      author: '홍길동',
      subject: '네트워크',
      problemNumber: '77',
      date: '2025-03-01',
      content: '',
    },
    '78': {
      title: 'ERD 작성법',
      author: '김철수',
      subject: '데이터베이스',
      problemNumber: '78',
      date: '2025-02-28',
      content: '',
    },
    '79': {
      title: '가상 메모리',
      author: '이영희',
      subject: '운영체제',
      problemNumber: '79',
      date: '2025-02-27',
      content: '',
    },
    '80': {
      title: '해시 테이블',
      author: '박민수',
      subject: '자료구조',
      problemNumber: '80',
      date: '2025-02-26',
      content: '',
    },
    '81': {
      title: 'FTP 프로토콜',
      author: '홍길동',
      subject: '네트워크',
      problemNumber: '81',
      date: '2025-02-25',
      content: '',
    },
    '82': {
      title: '인덱스 최적화',
      author: '김철수',
      subject: '데이터베이스',
      problemNumber: '82',
      date: '2025-02-24',
      content: '',
    },
    '83': {
      title: '데드락 해결',
      author: '이영희',
      subject: '운영체제',
      problemNumber: '83',
      date: '2025-02-23',
      content: '',
    },
    '84': {
      title: '트리 순회',
      author: '박민수',
      subject: '자료구조',
      problemNumber: '84',
      date: '2025-02-22',
      content: '',
    },
    '85': {
      title: 'UDP 특징',
      author: '홍길동',
      subject: '네트워크',
      problemNumber: '85',
      date: '2025-02-21',
      content: '',
    },
    '86': {
      title: '조인 연산',
      author: '김철수',
      subject: '데이터베이스',
      problemNumber: '86',
      date: '2025-02-20',
      content: '',
    },
    '87': {
      title: 'CPU 스케줄링',
      author: '이영희',
      subject: '운영체제',
      problemNumber: '87',
      date: '2025-02-19',
      content: '',
    },
    '88': {
      title: '큐 구현',
      author: '박민수',
      subject: '자료구조',
      problemNumber: '88',
      date: '2025-02-18',
      content: '',
    },
    '89': {
      title: 'ICMP 프로토콜',
      author: '홍길동',
      subject: '네트워크',
      problemNumber: '89',
      date: '2025-02-17',
      content: '',
    },
    '90': {
      title: '뷰(View)',
      author: '김철수',
      subject: '데이터베이스',
      problemNumber: '90',
      date: '2025-02-16',
      content: '',
    },
    '91': {
      title: '페이지 교체',
      author: '이영희',
      subject: '운영체제',
      problemNumber: '91',
      date: '2025-02-15',
      content: '',
    },
    '92': {
      title: '그래프 DFS/BFS',
      author: '박민수',
      subject: '자료구조',
      problemNumber: '92',
      date: '2025-02-14',
      content: '',
    },
    '93': {
      title: 'NAT 기능',
      author: '홍길동',
      subject: '네트워크',
      problemNumber: '93',
      date: '2025-02-13',
      content: '',
    },
    '94': {
      title: '트랜잭션 관리',
      author: '김철수',
      subject: '데이터베이스',
      problemNumber: '94',
      date: '2025-02-12',
      content: '',
    },
    '95': {
      title: '메모리 관리',
      author: '이영희',
      subject: '운영체제',
      problemNumber: '95',
      date: '2025-02-11',
      content: '',
    },
    '96': {
      title: '힙 자료구조',
      author: '박민수',
      subject: '자료구조',
      problemNumber: '96',
      date: '2025-02-10',
      content: '',
    },
    '97': {
      title: 'ARP 프로토콜',
      author: '홍길동',
      subject: '네트워크',
      problemNumber: '97',
      date: '2025-02-09',
      content: '',
    },
    '98': {
      title: '백업 및 복구',
      author: '김철수',
      subject: '데이터베이스',
      problemNumber: '98',
      date: '2025-02-08',
      content: '',
    },
    '99': {
      title: '인터럽트 처리',
      author: '이영희',
      subject: '운영체제',
      problemNumber: '99',
      date: '2025-02-07',
      content: '',
    },
    '100': {
      title: '트라이 구조',
      author: '박민수',
      subject: '자료구조',
      problemNumber: '100',
      date: '2025-02-06',
      content: '',
    },
    '101': {
      title: 'HTTP/HTTPS',
      author: '홍길동',
      subject: '네트워크',
      problemNumber: '101',
      date: '2025-02-05',
      content: '',
    },
    '102': {
      title: '인덱스 구조',
      author: '김철수',
      subject: '데이터베이스',
      problemNumber: '102',
      date: '2025-02-04',
      content: '',
    },
    '103': {
      title: '세마포어와 뮤텍스',
      author: '이영희',
      subject: '운영체제',
      problemNumber: '103',
      date: '2025-02-03',
      content: '',
    },
    '104': {
      title: '이진 탐색 트리',
      author: '박민수',
      subject: '자료구조',
      problemNumber: '104',
      date: '2025-02-02',
      content: '',
    },
    '105': {
      title: 'SMTP 프로토콜',
      author: '홍길동',
      subject: '네트워크',
      problemNumber: '105',
      date: '2025-02-01',
      content: '',
    },
    '106': {
      title: '조인 최적화',
      author: '김철수',
      subject: '데이터베이스',
      problemNumber: '106',
      date: '2025-01-31',
      content: '',
    },
    '107': {
      title: '가상 메모리 관리',
      author: '이영희',
      subject: '운영체제',
      problemNumber: '107',
      date: '2025-01-30',
      content: '',
    },
    '108': {
      title: '큐와 덱',
      author: '박민수',
      subject: '자료구조',
      problemNumber: '108',
      date: '2025-01-29',
      content: '',
    },
    '109': {
      title: 'TCP/IP 모델',
      author: '홍길동',
      subject: '네트워크',
      problemNumber: '109',
      date: '2025-01-28',
      content: '',
    },
    '110': {
      title: '데이터베이스 트랜잭션',
      author: '김철수',
      subject: '데이터베이스',
      problemNumber: '110',
      date: '2025-01-27',
      content: '',
    },
    '111': {
      title: '프로세스 동기화',
      author: '이영희',
      subject: '운영체제',
      problemNumber: '111',
      date: '2025-01-26',
      content: '',
    },
    '112': {
      title: '그래프 응용',
      author: '박민수',
      subject: '자료구조',
      problemNumber: '112',
      date: '2025-01-25',
      content: '',
    },
    '113': {
      title: 'DNS 작동 원리',
      author: '홍길동',
      subject: '네트워크',
      problemNumber: '113',
      date: '2025-01-24',
      content: '',
    },
    '114': {
      title: '정규화 이론',
      author: '김철수',
      subject: '데이터베이스',
      problemNumber: '114',
      date: '2025-01-23',
      content: '',
    },
    '115': {
      title: '가상화 기술',
      author: '이영희',
      subject: '운영체제',
      problemNumber: '115',
      date: '2025-01-22',
      content: '',
    },
    '116': {
      title: '트라이 응용',
      author: '박민수',
      subject: '자료구조',
      problemNumber: '116',
      date: '2025-01-21',
      content: '',
    },
    '117': {
      title: '라우팅 프로토콜',
      author: '홍길동',
      subject: '네트워크',
      problemNumber: '117',
      date: '2025-01-20',
      content: '',
    },
    '118': {
      title: '인덱스 구조 개선',
      author: '김철수',
      subject: '데이터베이스',
      problemNumber: '118',
      date: '2025-01-19',
      content: '',
    },
    '119': {
      title: '프로세스 관리',
      author: '이영희',
      subject: '운영체제',
      problemNumber: '119',
      date: '2025-01-18',
      content: '',
    },
    '120': {
      title: '힙 응용',
      author: '박민수',
      subject: '자료구조',
      problemNumber: '120',
      date: '2025-01-17',
      content: '',
    },
    '121': {
      title: 'QoS 개념',
      author: '홍길동',
      subject: '네트워크',
      problemNumber: '121',
      date: '2025-01-16',
      content: '',
    },
    '122': {
      title: '데이터 무결성',
      author: '김철수',
      subject: '데이터베이스',
      problemNumber: '122',
      date: '2025-01-15',
      content: '',
    },
    '123': {
      title: '파일 시스템',
      author: '이영희',
      subject: '운영체제',
      problemNumber: '123',
      date: '2025-01-14',
      content: '',
    },
    '124': {
      title: '그래프 최단 경로',
      author: '박민수',
      subject: '자료구조',
      problemNumber: '124',
      date: '2025-01-13',
      content: '',
    },
    '125': {
      title: '네트워크 보안',
      author: '홍길동',
      subject: '네트워크',
      problemNumber: '125',
      date: '2025-01-12',
      content: '',
    },
    '126': {
      title: 'SQL 최적화',
      author: '김철수',
      subject: '데이터베이스',
      problemNumber: '126',
      date: '2025-01-11',
      content: '',
    }

  };

  useEffect(() => {
    if (number && exampleData[number]) {
      setQuestionInfo(exampleData[number]);
    } else {
      setQuestionInfo(null);
    }
  }, [number]);

  // 댓글 작성 핸들러
  const handleCommentSubmit = () => {
    const trimmed = input.trim();
    if (trimmed === '') {
      alert('댓글을 입력해주세요.');
      return;
    }

    const newComment = {
      text: trimmed,
      author: '익명',
    };

    setComments([...comments, newComment]);
    setInput('');
  };

  // Enter 키 핸들러
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommentSubmit();
    }
  };

  return (
    <div className="bg-white min-h-screen p-6">
      {!questionInfo ? (
        <p className="text-center text-gray-500">질문 정보를 불러올 수 없습니다.</p>
      ) : (
        <>
          {/* 질문 정보 테이블 */}
          <table className="question-table border w-full text-sm mb-6">
            <tbody>
              <tr className="border-b">
                <td className="p-2 font-semibold">제목</td>
                <td className="p-2" colSpan="3">{questionInfo.title}</td>
                <td className="p-2 font-semibold">작성자</td>
                <td className="p-2">{questionInfo.author}</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-semibold">주제</td>
                <td className="p-2">{questionInfo.subject}</td>
                <td className="p-2 font-semibold">문제 번호</td>
                <td className="p-2">{questionInfo.problemNumber}</td>
                <td className="p-2 font-semibold">작성일</td>
                <td className="p-2">{questionInfo.date}</td>
              </tr>
            </tbody>
          </table>

          {/* 질문 내용 */}
          <div className="content-box border p-4 mb-6">
            {questionInfo.content}
          </div>

          {/* 액션 버튼 */}
          <div className="actions flex gap-4 mb-6">
            <button className="text-gray-700 hover:text-red-300">🤍 공감</button>
            <button className="text-gray-700 hover:text-blue-600">수정</button>
            <button className="text-gray-700 hover:text-red-600">삭제</button>
          </div>
        </>
      )}

      {/* 댓글 입력 */}
      <div className="comment-input flex mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="댓글을 입력하세요"
          className="border p-2 w-full rounded-l-md"
        />
        <button
          onClick={handleCommentSubmit}
          className="bg-blue-600 text-white px-4 py-1 rounded-r-md hover:bg-blue-700"
        > 작성
        </button>
      </div>

      {/* 댓글 목록 */}
      <table className="comment-table w-full text-sm border-t">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">내용</th>
            <th className="p-2 text-left">작성자</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((comment, index) => (
            <tr key={index} className="border-t">
              <td className="p-2">{comment.text}</td>
              <td className="p-2">{comment.author}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

};

export default QuestionBoard;
