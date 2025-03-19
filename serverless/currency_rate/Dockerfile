FROM public.ecr.aws/lambda/nodejs:18

# Copy function code

COPY package*.json ./
COPY db.js ./
COPY apiFiats.js ./
COPY index.js ${LAMBDA_TASK_ROOT}

RUN npm install

ARG DB_URI
ENV DB_URI=${DB_URI}
ARG CURRENCY_SERVICE_URL
ENV CURRENCY_SERVICE_URL=${CURRENCY_SERVICE_URL}
ARG ACCESS_KEY
ENV ACCESS_KEY=${ACCESS_KEY}
  
# Set the CMD to your handler (could also be done as a parameter override outside of the Dockerfile)
CMD [ "index.main" ]