import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from "../components/global/Pagination";

const itemsPerPage = 10;
const pageGroupSize = 10;

function QuestionBoard() {
  const [questions, setQuestions] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageGroup, setCurrentPageGroup] = useState(0);

  useEffect(() => {
    const dummyQuestions = [
      {
        "category": "네트워크",
        "title": "TCP/IP 기본",
        "number": 1,
        "author": "홍길동",
        "comments": 7,
        "likes": 21,
        "date": "2025-05-16"
      },
      {
        "category": "데이터베이스",
        "title": "SQL 조인",
        "number": 2,
        "author": "김철수",
        "comments": 4,
        "likes": 3,
        "date": "2025-05-15"
      },
      {
        "category": "운영체제",
        "title": "프로세스와 스레드",
        "number": 3,
        "author": "이영희",
        "comments": 11,
        "likes": 16,
        "date": "2025-05-14"
      },
      {
        "category": "자료구조",
        "title": "이진트리 순회",
        "number": 4,
        "author": "박민수",
        "comments": 2,
        "likes": 28,
        "date": "2025-05-13"
      },
      {
        "category": "네트워크",
        "title": "라우팅 개념",
        "number": 5,
        "author": "홍길동",
        "comments": 6,
        "likes": 7,
        "date": "2025-05-12"
      },
      {
        "category": "데이터베이스",
        "title": "인덱스 최적화",
        "number": 6,
        "author": "김철수",
        "comments": 3,
        "likes": 19,
        "date": "2025-05-11"
      },
      {
        "category": "운영체제",
        "title": "메모리 관리",
        "number": 7,
        "author": "이영희",
        "comments": 15,
        "likes": 24,
        "date": "2025-05-10"
      },
      {
        "category": "자료구조",
        "title": "스택과 큐",
        "number": 8,
        "author": "박민수",
        "comments": 10,
        "likes": 8,
        "date": "2025-05-09"
      },
      {
        "category": "네트워크",
        "title": "TCP 연결 설정",
        "number": 9,
        "author": "홍길동",
        "comments": 7,
        "likes": 22,
        "date": "2025-05-08"
      },
      {
        "category": "데이터베이스",
        "title": "트랜잭션 개념",
        "number": 10,
        "author": "김철수",
        "comments": 5,
        "likes": 11,
        "date": "2025-05-07"
      },
      {
        "category": "운영체제",
        "title": "스레드 동기화",
        "number": 11,
        "author": "이영희",
        "comments": 6,
        "likes": 9,
        "date": "2025-05-06"
      },
      {
        "category": "자료구조",
        "title": "그래프 탐색",
        "number": 12,
        "author": "박민수",
        "comments": 3,
        "likes": 10,
        "date": "2025-05-05"
      },
      {
        "category": "네트워크",
        "title": "IP 주소 체계",
        "number": 13,
        "author": "홍길동",
        "comments": 10,
        "likes": 24,
        "date": "2025-05-04"
      },
      {
        "category": "데이터베이스",
        "title": "조인 유형",
        "number": 14,
        "author": "김철수",
        "comments": 2,
        "likes": 18,
        "date": "2025-05-03"
      },
      {
        "category": "운영체제",
        "title": "프로세스 스케줄링",
        "number": 15,
        "author": "이영희",
        "comments": 17,
        "likes": 28,
        "date": "2025-05-02"
      },
      {
        "category": "자료구조",
        "title": "이진 탐색 트리",
        "number": 16,
        "author": "박민수",
        "comments": 1,
        "likes": 6,
        "date": "2025-05-01"
      },
      {
        "category": "네트워크",
        "title": "UDP 프로토콜",
        "number": 17,
        "author": "홍길동",
        "comments": 5,
        "likes": 10,
        "date": "2025-04-30"
      },
      {
        "category": "데이터베이스",
        "title": "데이터 정규화",
        "number": 18,
        "author": "김철수",
        "comments": 8,
        "likes": 19,
        "date": "2025-04-29"
      },
      {
        "category": "운영체제",
        "title": "가상 메모리",
        "number": 19,
        "author": "이영희",
        "comments": 12,
        "likes": 20,
        "date": "2025-04-28"
      },
      {
        "category": "자료구조",
        "title": "힙 자료구조",
        "number": 20,
        "author": "박민수",
        "comments": 4,
        "likes": 11,
        "date": "2025-04-27"
      },
      {
        "category": "네트워크",
        "title": "네트워크 보안",
        "number": 21,
        "author": "홍길동",
        "comments": 9,
        "likes": 25,
        "date": "2025-04-26"
      },
      {
        "category": "데이터베이스",
        "title": "뷰와 인덱스",
        "number": 22,
        "author": "김철수",
        "comments": 3,
        "likes": 6,
        "date": "2025-04-25"
      },
      {
        "category": "운영체제",
        "title": "파일 시스템",
        "number": 23,
        "author": "이영희",
        "comments": 15,
        "likes": 24,
        "date": "2025-04-24"
      },
      {
        "category": "자료구조",
        "title": "해시 테이블",
        "number": 24,
        "author": "박민수",
        "comments": 0,
        "likes": 9,
        "date": "2025-04-23"
      },
      {
        "category": "네트워크",
        "title": "DNS 이해",
        "number": 25,
        "author": "홍길동",
        "comments": 6,
        "likes": 15,
        "date": "2025-04-22"
      },
      {
        "category": "데이터베이스",
        "title": "복제 및 백업",
        "number": 26,
        "author": "김철수",
        "comments": 11,
        "likes": 22,
        "date": "2025-04-21"
      },
      {
        "category": "운영체제",
        "title": "교착 상태",
        "number": 27,
        "author": "이영희",
        "comments": 7,
        "likes": 18,
        "date": "2025-04-20"
      },
      {
        "category": "자료구조",
        "title": "트라이 구조",
        "number": 28,
        "author": "박민수",
        "comments": 3,
        "likes": 6,
        "date": "2025-04-19"
      },
      {
        "category": "네트워크",
        "title": "패킷 스위칭",
        "number": 29,
        "author": "홍길동",
        "comments": 12,
        "likes": 28,
        "date": "2025-04-18"
      },
      {
        "category": "데이터베이스",
        "title": "쿼리 튜닝",
        "number": 30,
        "author": "김철수",
        "comments": 9,
        "likes": 29,
        "date": "2025-04-17"
      },
      {
        "category": "운영체제",
        "title": "시그널 처리",
        "number": 31,
        "author": "이영희",
        "comments": 5,
        "likes": 14,
        "date": "2025-04-16"
      },
      {
        "category": "자료구조",
        "title": "링크드 리스트",
        "number": 32,
        "author": "박민수",
        "comments": 8,
        "likes": 27,
        "date": "2025-04-15"
      },
      {
        "category": "네트워크",
        "title": "서브넷 마스크",
        "number": 33,
        "author": "홍길동",
        "comments": 3,
        "likes": 10,
        "date": "2025-04-14"
      },
      {
        "category": "데이터베이스",
        "title": "데이터 무결성",
        "number": 34,
        "author": "김철수",
        "comments": 2,
        "likes": 3,
        "date": "2025-04-13"
      },
      {
        "category": "운영체제",
        "title": "입출력 관리",
        "number": 35,
        "author": "이영희",
        "comments": 7,
        "likes": 11,
        "date": "2025-04-12"
      },
      {
        "category": "자료구조",
        "title": "AVL 트리",
        "number": 36,
        "author": "박민수",
        "comments": 4,
        "likes": 7,
        "date": "2025-04-11"
      },
      {
        "category": "네트워크",
        "title": "방화벽 원리",
        "number": 37,
        "author": "홍길동",
        "comments": 6,
        "likes": 16,
        "date": "2025-04-10"
      },
      {
        "category": "데이터베이스",
        "title": "인덱스 설계",
        "number": 38,
        "author": "김철수",
        "comments": 11,
        "likes": 27,
        "date": "2025-04-09"
      },
      {
        "category": "운영체제",
        "title": "캐시 메모리",
        "number": 39,
        "author": "이영희",
        "comments": 2,
        "likes": 9,
        "date": "2025-04-08"
      },
      {
        "category": "자료구조",
        "title": "큐 자료구조",
        "number": 40,
        "author": "박민수",
        "comments": 5,
        "likes": 13,
        "date": "2025-04-07"
      },
      {
        "category": "네트워크",
        "title": "IPv6 주소 체계",
        "number": 41,
        "author": "홍길동",
        "comments": 8,
        "likes": 17,
        "date": "2025-04-06"
      },
      {
        "category": "데이터베이스",
        "title": "NoSQL 소개",
        "number": 42,
        "author": "김철수",
        "comments": 9,
        "likes": 21,
        "date": "2025-04-05"
      },
      {
        "category": "운영체제",
        "title": "스케줄링 알고리즘",
        "number": 43,
        "author": "이영희",
        "comments": 10,
        "likes": 22,
        "date": "2025-04-04"
      },
      {
        "category": "자료구조",
        "title": "그래프 최단 경로",
        "number": 44,
        "author": "박민수",
        "comments": 6,
        "likes": 14,
        "date": "2025-04-03"
      },
      {
        "category": "네트워크",
        "title": "HTTP/2 프로토콜",
        "number": 45,
        "author": "홍길동",
        "comments": 4,
        "likes": 10,
        "date": "2025-04-02"
      },
      {
        "category": "데이터베이스",
        "title": "트랜잭션 격리 수준",
        "number": 46,
        "author": "김철수",
        "comments": 7,
        "likes": 16,
        "date": "2025-04-01"
      },
      {
        "category": "운영체제",
        "title": "가상화 기술",
        "number": 47,
        "author": "이영희",
        "comments": 12,
        "likes": 20,
        "date": "2025-03-31"
      },
      {
        "category": "자료구조",
        "title": "힙 정렬",
        "number": 48,
        "author": "박민수",
        "comments": 5,
        "likes": 13,
        "date": "2025-03-30"
      },
      {
        "category": "네트워크",
        "title": "라우팅 프로토콜",
        "number": 49,
        "author": "홍길동",
        "comments": 9,
        "likes": 24,
        "date": "2025-03-29"
      },
      {
        "category": "데이터베이스",
        "title": "정규화 단계",
        "number": 50,
        "author": "김철수",
        "comments": 3,
        "likes": 8,
        "date": "2025-03-28"
      },
      {
        "category": "운영체제",
        "title": "세마포어",
        "number": 51,
        "author": "이영희",
        "comments": 8,
        "likes": 15,
        "date": "2025-03-27"
      },
      {
        "category": "자료구조",
        "title": "트라이 구현",
        "number": 52,
        "author": "박민수",
        "comments": 2,
        "likes": 9,
        "date": "2025-03-26"
      },
      {
        "category": "네트워크",
        "title": "패킷 필터링",
        "number": 53,
        "author": "홍길동",
        "comments": 7,
        "likes": 18,
        "date": "2025-03-25"
      },
      {
        "category": "데이터베이스",
        "title": "인덱스 유형",
        "number": 54,
        "author": "김철수",
        "comments": 11,
        "likes": 23,
        "date": "2025-03-24"
      },
      {
        "category": "운영체제",
        "title": "프로세스 생성과 종료",
        "number": 55,
        "author": "이영희",
        "comments": 6,
        "likes": 12,
        "date": "2025-03-23"
      },
      {
        "category": "자료구조",
        "title": "그래프 표현법",
        "number": 56,
        "author": "박민수",
        "comments": 4,
        "likes": 10,
        "date": "2025-03-22"
      },
      {
        "category": "네트워크",
        "title": "DHCP 원리",
        "number": 57,
        "author": "홍길동",
        "comments": 5,
        "likes": 11,
        "date": "2025-03-21"
      },
      {
        "category": "데이터베이스",
        "title": "ER 모델링",
        "number": 58,
        "author": "김철수",
        "comments": 10,
        "likes": 22,
        "date": "2025-03-20"
      },
      {
        "category": "운영체제",
        "title": "페이지 교체 알고리즘",
        "number": 59,
        "author": "이영희",
        "comments": 7,
        "likes": 15,
        "date": "2025-03-19"
      },
      {
        "category": "자료구조",
        "title": "이진 탐색",
        "number": 60,
        "author": "박민수",
        "comments": 3,
        "likes": 7,
        "date": "2025-03-18"
      },
      {
        "category": "네트워크",
        "title": "ARP 프로토콜",
        "number": 61,
        "author": "홍길동",
        "comments": 4,
        "likes": 9,
        "date": "2025-03-17"
      },
      {
        "category": "데이터베이스",
        "title": "동시성 제어",
        "number": 62,
        "author": "김철수",
        "comments": 9,
        "likes": 20,
        "date": "2025-03-16"
      },
      {
        "category": "운영체제",
        "title": "인터럽트 처리",
        "number": 63,
        "author": "이영희",
        "comments": 5,
        "likes": 13,
        "date": "2025-03-15"
      },
      {
        "category": "자료구조",
        "title": "순환 연결 리스트",
        "number": 64,
        "author": "박민수",
        "comments": 6,
        "likes": 12,
        "date": "2025-03-14"
      },
      {
        "category": "네트워크",
        "title": "포트 번호",
        "number": 65,
        "author": "홍길동",
        "comments": 3,
        "likes": 7,
        "date": "2025-03-13"
      },
      {
        "category": "데이터베이스",
        "title": "샤딩 기술",
        "number": 66,
        "author": "김철수",
        "comments": 7,
        "likes": 14,
        "date": "2025-03-12"
      },
      {
        "category": "운영체제",
        "title": "동기화 기법",
        "number": 67,
        "author": "이영희",
        "comments": 9,
        "likes": 21,
        "date": "2025-03-11"
      },
      {
        "category": "자료구조",
        "title": "덱 자료구조",
        "number": 68,
        "author": "박민수",
        "comments": 2,
        "likes": 6,
        "date": "2025-03-10"
      },
      {
        "category": "네트워크",
        "title": "TCP 혼잡 제어",
        "number": 69,
        "author": "홍길동",
        "comments": 11,
        "likes": 27,
        "date": "2025-03-09"
      },
      {
        "category": "데이터베이스",
        "title": "데이터 웨어하우스",
        "number": 70,
        "author": "김철수",
        "comments": 8,
        "likes": 19,
        "date": "2025-03-08"
      },
      {
        "category": "운영체제",
        "title": "메모리 단편화",
        "number": 71,
        "author": "이영희",
        "comments": 4,
        "likes": 10,
        "date": "2025-03-07"
      },
      {
        "category": "자료구조",
        "title": "비트맵",
        "number": 72,
        "author": "박민수",
        "comments": 5,
        "likes": 8,
        "date": "2025-03-06"
      },
      {
        "category": "네트워크",
        "title": "DNS 시스템",
        "number": 73,
        "author": "홍길동",
        "comments": 6,
        "likes": 13,
        "date": "2025-03-05"
      },
      {
        "category": "데이터베이스",
        "title": "백업 전략",
        "number": 74,
        "author": "김철수",
        "comments": 10,
        "likes": 22,
        "date": "2025-03-04"
      },
      {
        "category": "운영체제",
        "title": "컨텍스트 스위칭",
        "number": 75,
        "author": "이영희",
        "comments": 7,
        "likes": 16,
        "date": "2025-03-03"
      },
      {
        "category": "자료구조",
        "title": "스택 구현",
        "number": 76,
        "author": "박민수",
        "comments": 3,
        "likes": 7,
        "date": "2025-03-02"
      },
      {
        "category": "네트워크",
        "title": "SSL/TLS",
        "number": 77,
        "author": "홍길동",
        "comments": 9,
        "likes": 20,
        "date": "2025-03-01"
      },
      {
        "category": "데이터베이스",
        "title": "ERD 작성법",
        "number": 78,
        "author": "김철수",
        "comments": 8,
        "likes": 18,
        "date": "2025-02-28"
      },
      {
        "category": "운영체제",
        "title": "가상 메모리",
        "number": 79,
        "author": "이영희",
        "comments": 5,
        "likes": 13,
        "date": "2025-02-27"
      },
      {
        "category": "자료구조",
        "title": "해시 테이블",
        "number": 80,
        "author": "박민수",
        "comments": 6,
        "likes": 14,
        "date": "2025-02-26"
      },
      {
        "category": "네트워크",
        "title": "FTP 프로토콜",
        "number": 81,
        "author": "홍길동",
        "comments": 4,
        "likes": 10,
        "date": "2025-02-25"
      },
      {
        "category": "데이터베이스",
        "title": "인덱스 최적화",
        "number": 82,
        "author": "김철수",
        "comments": 7,
        "likes": 15,
        "date": "2025-02-24"
      },
      {
        "category": "운영체제",
        "title": "데드락 해결",
        "number": 83,
        "author": "이영희",
        "comments": 9,
        "likes": 18,
        "date": "2025-02-23"
      },
      {
        "category": "자료구조",
        "title": "트리 순회",
        "number": 84,
        "author": "박민수",
        "comments": 5,
        "likes": 12,
        "date": "2025-02-22"
      },
      {
        "category": "네트워크",
        "title": "UDP 특징",
        "number": 85,
        "author": "홍길동",
        "comments": 6,
        "likes": 14,
        "date": "2025-02-21"
      },
      {
        "category": "데이터베이스",
        "title": "조인 연산",
        "number": 86,
        "author": "김철수",
        "comments": 8,
        "likes": 17,
        "date": "2025-02-20"
      },
      {
        "category": "운영체제",
        "title": "CPU 스케줄링",
        "number": 87,
        "author": "이영희",
        "comments": 4,
        "likes": 11,
        "date": "2025-02-19"
      },
      {
        "category": "자료구조",
        "title": "큐 구현",
        "number": 88,
        "author": "박민수",
        "comments": 3,
        "likes": 7,
        "date": "2025-02-18"
      },
      {
        "category": "네트워크",
        "title": "ICMP 프로토콜",
        "number": 89,
        "author": "홍길동",
        "comments": 5,
        "likes": 12,
        "date": "2025-02-17"
      },
      {
        "category": "데이터베이스",
        "title": "뷰(View)",
        "number": 90,
        "author": "김철수",
        "comments": 6,
        "likes": 14,
        "date": "2025-02-16"
      },
      {
        "category": "운영체제",
        "title": "페이지 교체",
        "number": 91,
        "author": "이영희",
        "comments": 7,
        "likes": 15,
        "date": "2025-02-15"
      },
      {
        "category": "자료구조",
        "title": "그래프 DFS/BFS",
        "number": 92,
        "author": "박민수",
        "comments": 8,
        "likes": 18,
        "date": "2025-02-14"
      },
      {
        "category": "네트워크",
        "title": "NAT 기능",
        "number": 93,
        "author": "홍길동",
        "comments": 3,
        "likes": 9,
        "date": "2025-02-13"
      },
      {
        "category": "데이터베이스",
        "title": "트랜잭션 관리",
        "number": 94,
        "author": "김철수",
        "comments": 7,
        "likes": 16,
        "date": "2025-02-12"
      },
      {
        "category": "운영체제",
        "title": "메모리 관리",
        "number": 95,
        "author": "이영희",
        "comments": 9,
        "likes": 20,
        "date": "2025-02-11"
      },
      {
        "category": "자료구조",
        "title": "힙 자료구조",
        "number": 96,
        "author": "박민수",
        "comments": 4,
        "likes": 10,
        "date": "2025-02-10"
      },
      {
        "category": "네트워크",
        "title": "ARP 프로토콜",
        "number": 97,
        "author": "홍길동",
        "comments": 5,
        "likes": 11,
        "date": "2025-02-09"
      },
      {
        "category": "데이터베이스",
        "title": "백업 및 복구",
        "number": 98,
        "author": "김철수",
        "comments": 10,
        "likes": 23,
        "date": "2025-02-08"
      },
      {
        "category": "운영체제",
        "title": "인터럽트 처리",
        "number": 99,
        "author": "이영희",
        "comments": 6,
        "likes": 14,
        "date": "2025-02-07"
      },
      {
        "category": "자료구조",
        "title": "트라이 구조",
        "number": 100,
        "author": "박민수",
        "comments": 3,
        "likes": 8,
        "date": "2025-02-06"
      },
      {
        "category": "네트워크",
        "title": "HTTP/HTTPS",
        "number": 101,
        "author": "홍길동",
        "comments": 8,
        "likes": 19,
        "date": "2025-02-05"
      },
      {
        "category": "데이터베이스",
        "title": "인덱스 구조",
        "number": 102,
        "author": "김철수",
        "comments": 9,
        "likes": 21,
        "date": "2025-02-04"
      },
      {
        "category": "운영체제",
        "title": "세마포어와 뮤텍스",
        "number": 103,
        "author": "이영희",
        "comments": 7,
        "likes": 16,
        "date": "2025-02-03"
      },
      {
        "category": "자료구조",
        "title": "이진 탐색 트리",
        "number": 104,
        "author": "박민수",
        "comments": 5,
        "likes": 13,
        "date": "2025-02-02"
      },
      {
        "category": "네트워크",
        "title": "SMTP 프로토콜",
        "number": 105,
        "author": "홍길동",
        "comments": 4,
        "likes": 9,
        "date": "2025-02-01"
      },
      {
        "category": "데이터베이스",
        "title": "조인 최적화",
        "number": 106,
        "author": "김철수",
        "comments": 6,
        "likes": 15,
        "date": "2025-01-31"
      },
      {
        "category": "운영체제",
        "title": "가상 메모리 관리",
        "number": 107,
        "author": "이영희",
        "comments": 5,
        "likes": 12,
        "date": "2025-01-30"
      },
      {
        "category": "자료구조",
        "title": "큐와 덱",
        "number": 108,
        "author": "박민수",
        "comments": 3,
        "likes": 7,
        "date": "2025-01-29"
      },
      {
        "category": "네트워크",
        "title": "TCP/IP 모델",
        "number": 109,
        "author": "홍길동",
        "comments": 9,
        "likes": 20,
        "date": "2025-01-28"
      },
      {
        "category": "데이터베이스",
        "title": "데이터베이스 트랜잭션",
        "number": 110,
        "author": "김철수",
        "comments": 7,
        "likes": 16,
        "date": "2025-01-27"
      },
      {
        "category": "운영체제",
        "title": "프로세스 동기화",
        "number": 111,
        "author": "이영희",
        "comments": 6,
        "likes": 14,
        "date": "2025-01-26"
      },
      {
        "category": "자료구조",
        "title": "그래프 응용",
        "number": 112,
        "author": "박민수",
        "comments": 4,
        "likes": 11,
        "date": "2025-01-25"
      },
      {
        "category": "네트워크",
        "title": "DNS 작동 원리",
        "number": 113,
        "author": "홍길동",
        "comments": 7,
        "likes": 17,
        "date": "2025-01-24"
      },
      {
        "category": "데이터베이스",
        "title": "정규화 이론",
        "number": 114,
        "author": "김철수",
        "comments": 8,
        "likes": 18,
        "date": "2025-01-23"
      },
      {
        "category": "운영체제",
        "title": "가상화 기술",
        "number": 115,
        "author": "이영희",
        "comments": 5,
        "likes": 13,
        "date": "2025-01-22"
      },
      {
        "category": "자료구조",
        "title": "트라이 응용",
        "number": 116,
        "author": "박민수",
        "comments": 6,
        "likes": 15,
        "date": "2025-01-21"
      },
      {
        "category": "네트워크",
        "title": "라우팅 프로토콜",
        "number": 117,
        "author": "홍길동",
        "comments": 4,
        "likes": 10,
        "date": "2025-01-20"
      },
      {
        "category": "데이터베이스",
        "title": "인덱스 구조 개선",
        "number": 118,
        "author": "김철수",
        "comments": 9,
        "likes": 21,
        "date": "2025-01-19"
      },
      {
        "category": "운영체제",
        "title": "프로세스 관리",
        "number": 119,
        "author": "이영희",
        "comments": 7,
        "likes": 16,
        "date": "2025-01-18"
      },
      {
        "category": "자료구조",
        "title": "힙 응용",
        "number": 120,
        "author": "박민수",
        "comments": 5,
        "likes": 13,
        "date": "2025-01-17"
      },
      {
        "category": "네트워크",
        "title": "QoS 개념",
        "number": 121,
        "author": "홍길동",
        "comments": 6,
        "likes": 14,
        "date": "2025-01-16"
      },
      {
        "category": "데이터베이스",
        "title": "데이터 무결성",
        "number": 122,
        "author": "김철수",
        "comments": 8,
        "likes": 18,
        "date": "2025-01-15"
      },
      {
        "category": "운영체제",
        "title": "파일 시스템",
        "number": 123,
        "author": "이영희",
        "comments": 7,
        "likes": 17,
        "date": "2025-01-14"
      },
      {
        "category": "자료구조",
        "title": "그래프 최단 경로",
        "number": 124,
        "author": "박민수",
        "comments": 9,
        "likes": 20,
        "date": "2025-01-13"
      },
      {
        "category": "네트워크",
        "title": "네트워크 보안",
        "number": 125,
        "author": "홍길동",
        "comments": 10,
        "likes": 22,
        "date": "2025-01-12"
      },
      {
        "category": "데이터베이스",
        "title": "SQL 최적화",
        "number": 126,
        "author": "김철수",
        "comments": 11,
        "likes": 24,
        "date": "2025-01-11"
      }
    ];
    setQuestions(dummyQuestions);
  }, []);

  const filtered = questions.filter((q) => {
    const matchesCategory = category === "all" || q.category === category;
    const matchesSearch = q.title.includes(searchTerm);
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const totalPageGroups = Math.ceil(totalPages / pageGroupSize);

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageItems = filtered.slice(start, end);

  const groupStart = currentPageGroup * pageGroupSize + 1;
  let groupEnd = groupStart + pageGroupSize - 1;
  if (groupEnd > totalPages) groupEnd = totalPages;

  useEffect(() => {
    setCurrentPage(1);
    setCurrentPageGroup(0);
  }, [searchTerm, category]);

  useEffect(() => {
    const newPageGroup = Math.floor((currentPage - 1) / pageGroupSize);
    setCurrentPageGroup(newPageGroup);
  }, [currentPage]);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    setCurrentPageGroup(0);
  };

  return (
    <main className="px-6 py-10 max-w-6xl mx-auto bg-white min-h-screen">
      <form onSubmit={handleSearchSubmit} className="mb-6 flex justify-between items-center">
        <div>
          <label htmlFor="topic" className="mr-2 font-semibold text-gray-700">
            주제:
          </label>
          <select id="topic" value={category} onChange={handleCategoryChange} className="border px-4 py-2 rounded shadow-sm text-gray-700">
            <option value="all">전체</option>
            <option value="네트워크">네트워크</option>
            <option value="데이터베이스">데이터베이스</option>
            <option value="운영체제">운영체제</option>
            <option value="자료구조">자료구조</option>
            <option value="알고리즘">알고리즘</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <label htmlFor="search" className="font-semibold text-gray-700">
            제목 검색:
          </label>
          <input
            id="search"
            type="text"
            placeholder="검색어 입력"
            value={searchTerm}
            onChange={handleSearchChange}
            className="border px-4 py-2 rounded shadow-sm text-gray-700"
          />
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
            검색
          </button>
        </div>
      </form>

      <div className="grid grid-cols-12 gap-4 border-b border-gray-300 pb-2 text-black font-semibold select-none bg-[#C6E3FE]">
        <div className="col-span-1 text-center whitespace-nowrap">번호</div>
        <div className="col-span-3 text-center">글 제목</div>
        <div className="col-span-2 text-center">주제</div>
        <div className="col-span-2 text-center">작성자</div>
        <div className="col-span-1 text-center">댓글 수</div>
        <div className="col-span-1 text-center">추천 수</div>
        <div className="col-span-2 text-center">작성일</div>
      </div>

      {/* 질문 목록 */}
      <ul className="divide-y divide-gray-200">
        {pageItems.length === 0 ? (
          <li className="text-gray-500 p-4">검색 결과가 없습니다.</li>
        ) : (
          pageItems.map((problem) => (
            <li
              key={problem.number}
              className="grid grid-cols-12 gap-4 py-3 hover:bg-gray-50 cursor-pointer"
            >
              <div className="col-span-1 text-center text-gray-700 whitespace-nowrap">{problem.number}</div>
              <div className="col-span-3 text-center">
                <Link to={`./${problem.number}`} className="hover:underline">
                  {problem.title}
                </Link>
              </div>
              <div className="col-span-2 text-center text-gray-700">{problem.category}</div>
              <div className="col-span-2 text-center text-gray-700">{problem.author}</div>
              <div className="col-span-1 text-center text-gray-500">{problem.comments}</div>
              <div className="col-span-1 text-center text-gray-500">{problem.likes}</div>
              <div className="col-span-2 text-center text-gray-500">{problem.date}</div>
            </li>
          ))
        )}
      </ul>
      <div className="flex justify-end mt-5 mr-40">
        <Link to="./post"
          className="bg-blue-600 hover:bg-blue-700 text-white px-30 py-1 rounded"
        >글쓰기
        </Link>
      </div>
      {/* 페이지네이션 */}
      <Pagination
        totalPages={totalPages}
        page={currentPage}
        setPage={setCurrentPage}
        category={category}
      />
    </main>
  );
}

export default QuestionBoard;
