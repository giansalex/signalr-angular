FROM mcr.microsoft.com/dotnet/core/sdk:3.1-alpine AS build-env
WORKDIR /src
COPY *.sln ./
COPY RealTimeApp/RealTimeApp.csproj RealTimeApp/
RUN dotnet restore
COPY . .
WORKDIR /src/RealTimeApp
RUN dotnet publish -c Release -o /app

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-alpine
WORKDIR /app
COPY --from=build-env /app .
ENTRYPOINT ["dotnet", "RealTimeApp.dll"]
