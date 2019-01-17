FROM microsoft/dotnet:2.1-sdk AS build-env
WORKDIR /src
COPY *.sln ./
COPY RealTimeApp/RealTimeApp.csproj RealTimeApp/
RUN dotnet restore
COPY . .
WORKDIR /src/RealTimeApp
RUN dotnet publish -c Release -o /app

FROM microsoft/dotnet:2.1-aspnetcore-runtime
WORKDIR /app
COPY --from=build-env /app .
ENTRYPOINT ["dotnet", "RealTimeApp.dll"]
