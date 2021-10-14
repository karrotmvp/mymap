import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreatePostDTO } from './dto/create-post.dto';
import { PostService } from './post.service';

@Controller('api/post')
export class PostController {
    constructor(
        private readonly postService: PostService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post('/')
    async createPost(@Req() req: any, @Body() post: CreatePostDTO) {
        await this.postService.createPost(req.user.userId, post)
    }

    @UseGuards(JwtAuthGuard)
    @Get('/myPost')
    async readMyPost(@Req() req: any, @Query('page') page: number, @Query('perPage') perPage: number) {
        return await this.postService.readUserPost(req.user.userId, page, perPage);
    }

    @Get('/:postId')
    async readPost(@Param('postId') postId: number) {
        return await this.postService.readPost(postId);
    }

    @UseGuards(JwtAuthGuard)
    @Put('/:postId')
    async updatePost(@Req() req: any, @Body() post) {
        //업데이트 방법 관해서 조쉬에게 물어보기

    }

    @UseGuards(JwtAuthGuard)
    @Delete('/:postId')
    async deletePost(@Req() req: any, @Param('postId') postId: number) {
        await this.postService.deletePost(req.user.userId, postId);
    }//이까지 테스트완료

    @UseGuards(JwtAuthGuard)
    @Post('/savedPost/:postId')
    async savePost(@Req() req: any, @Param('postId') postId: number) {
        return await this.postService.savePost(req.user.userId, postId);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/savedPost')
    async readSavedPost(@Req() req: any, @Query('page') page: number, @Query('perPage') perPage: number) {
        return await this.postService.readSavedPost(req.user.userId, page, perPage);
    }

    @Get('/feed/:regionId')
    async readRegionPost(@Param('regionId') regionId: string, @Query('start') start: number, @Query('end') end: number, @Query('perPage') perPage: number) {
        return await this.postService.readRegionPost(regionId, start, end, perPage);
    }

}
