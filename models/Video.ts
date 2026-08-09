    import  mongoose, { Schema, model, models } from "mongoose";

    export  const VIDEO_DIMENSTIONS = {
        with: 1080,
        heigth:1920
    } as const; 

    export interface IVideo {
        _id?:  mongoose.Types.ObjectId
        title: string;
        description: string;
        videoUrl: string;
        thumbnaiUrl: string;
        controls?: boolean;
        transformation?: {
            height: number;
            width: number;
            quality?:number;
        };
    }

const videoSchema = new Schema<IVideo> (
    {
        title:{type:String, required: true},
        description:{type:String, required: true},
        videoUrl:{type:String, required: true},
        thumbnaiUrl:  {type:String, required: true},
        controls: {type:Boolean, default:true},
        transformation: {
            height: {type:Number, default:VIDEO_DIMENSTIONS.heigth},
            width: {type:Number, default:VIDEO_DIMENSTIONS.with},
            quality: {type:Number, default:100},
        },
    },
    {
        timestamps: true
    }
);
const Video = models.Video || model<IVideo>("Video", videoSchema);

export  default Video;