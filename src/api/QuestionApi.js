import axios from "axios";

export async function fetchQuestions(category, searchTerm) {
    try {
        const categoryPath = category === "전체" ? "" : `/${encodeURIComponent(category)}`;
        const response = await fetch(`/api/comm${categoryPath}`);

        const json = await response.json();

        if (!json.isSuccess || !json.result || !Array.isArray(json.result.posts)) {
            return [];
        }

        let posts = json.result.posts.map(post => ({
            number: post.id,
            title: post.title,
            category: post.category,
            author: post.author || "알 수 없음", // 응답 json 데이터 형식 수정 후 수정 예정
            comments: post.comments || 0, 
            likes: post.likes || 0,
            date: post.created_at ? post.created_at.slice(0, 10) : "",
        }));

        return posts;
    } catch (error) {
        console.error("질문 데이터를 가져오는데 실패했습니다:", error);
        return [];
    }
}