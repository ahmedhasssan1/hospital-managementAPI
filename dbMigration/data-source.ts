import {  DataSource, DataSourceOptions } from "typeorm";

export const  dataSourceOption:DataSourceOptions={
    
        type: 'postgres',
        port: 4000,
        host: 'localhost',
        username: 'postgres',
        database: process.env.DATABASE,
        password: process.env.DATABASE_PASSWORD,
        entities: [__dirname + '/../**/*.entity.js'],
        migrations: [__dirname + '/../migrations/*.{ts,js}'],
        synchronize:true,
        logging: true,  

}
const dataSource=new DataSource(dataSourceOption);
export default dataSource;