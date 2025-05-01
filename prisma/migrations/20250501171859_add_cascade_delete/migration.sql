-- DropForeignKey
ALTER TABLE "WeatherData" DROP CONSTRAINT "WeatherData_cityId_fkey";

-- AddForeignKey
ALTER TABLE "WeatherData" ADD CONSTRAINT "WeatherData_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE CASCADE ON UPDATE CASCADE;
