import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';

export async function POST(
    req:NextRequest
){
    try{

        const { name,email,password } = await req.json();
        
        if( !email) return NextResponse.json({error:"Email is required"},{status:400});
        
        if( !name) return NextResponse.json({error:"name is required"},{status:400});
        
        if( !password) return NextResponse.json({error:"password is required"},{status:400});

        const userExists = await prisma.user.findUnique({
            where:{
                email
            }
        });
        
        if(userExists) return NextResponse.json({ error:"User already exists"},{status:400});
        
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hashSync(salt,password);
        
        const newUser = await prisma.user.create({
            data:{
                name,
                email,
                password:hashedPassword
            }
        });
        
        return NextResponse.json(newUser, { status:201});
    }
    catch(e){
        console.log(`Error in POST user req ${e}`);
        return NextResponse.json({error:`Error in POST user req ${e}`},{status:500});
        
    }

}