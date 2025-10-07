# Stage 1: Build the application
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /source

# Copy the solution and project files first to leverage Docker layer caching
COPY *.sln .
COPY Core/*.csproj ./Core/
COPY Infrastructure/*.csproj ./Infrastructure/
COPY Web/*.csproj ./Web/

# Restore dependencies
RUN dotnet restore

# Copy the rest of the source code
COPY . .

# Publish the application
WORKDIR /source/Web
RUN dotnet publish -c Release -o /app/publish

# Stage 2: Create the final runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "Web.dll"]