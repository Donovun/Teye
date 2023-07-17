import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true
})

export class Table {
    
    @Prop()
    Version: string;

    @Prop()
    Color: string;

    @Prop()
    Wide: number;

    @Prop()
    Long: number;

    @Prop()
    High: number;

    @Prop()
    Weight: number;
}

export const TableSchema = SchemaFactory.createForClass(Table)