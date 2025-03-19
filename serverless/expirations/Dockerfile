FROM public.ecr.aws/lambda/nodejs:18

# Copy function code

COPY package*.json ./
COPY db.js ./
COPY cancelAd.js ./
COPY index.js ${LAMBDA_TASK_ROOT}

RUN npm install

ARG DB_URI
ENV DB_URI=${DB_URI}
ARG ADMIN_TOKEN
ENV ADMIN_TOKEN=${ADMIN_TOKEN}
ARG SERVICE_URL
ENV SERVICE_URL=${SERVICE_URL}
  
# Set the CMD to your handler (could also be done as a parameter override outside of the Dockerfile)
CMD [ "index.main" ]