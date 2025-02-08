import axios from "axios";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const response = await axios.post(
      "https://trendai-backend-lime.vercel.app/auth/login",
      { email, password },
      { withCredentials: true }
    );

    return Response.json(response.data);
  } catch (error) {
    return Response.json(
      { error: error.response?.data || "An error occurred" },
      { status: error.response?.status || 500 }
    );
  }
}
