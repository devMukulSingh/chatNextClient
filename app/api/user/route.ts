import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { token } = await req.json();
    if (!token) {
      return NextResponse.json({ error: "token is required" });
    }
    const response = NextResponse.json({ msg: "cookie set" }, { status: 200 });

    response.cookies.set("token", token);

    return response;
  } catch (e) {
    console.log(`error in SetToken POST req ${e}`);
    return NextResponse.json(e,{status:500});
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const response = NextResponse.json({ msg: "Logged out" }, { status: 200 });
    response.cookies.delete("token");
    return response;
  } catch (e) {
    console.log(`Error in GET logout ${e}`);
    return NextResponse.json(e, { status: 500 });

  }
}
