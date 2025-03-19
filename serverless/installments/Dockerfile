FROM public.ecr.aws/lambda/nodejs:20

# Copy function code

COPY package*.json ./
COPY db.js ./
COPY apiPriceBtc.js ./
COPY convertAmountFromUsdc.js ./
COPY sendNotification.js ./
COPY transferAmount.js ./
COPY userWallet.js ./
COPY wauEmail.js ./
COPY createTransaction.js ./
COPY consultDevices.js ./
COPY createNotification.js ./
COPY index.js ${LAMBDA_TASK_ROOT}

RUN npm install

ARG DB_URI
ENV DB_URI=${DB_URI}
ARG ADMIN_TOKEN
ENV ADMIN_TOKEN=${ADMIN_TOKEN}
ARG SERVICE_URL
ENV SERVICE_URL=${SERVICE_URL}
ARG AVILA_TEK_SERVICE_URL
ENV AVILA_TEK_SERVICE_URL=${AVILA_TEK_SERVICE_URL}
ARG COMMUNICATION_URL
ENV COMMUNICATION_URL=${COMMUNICATION_URL}
  
# Set the CMD to your handler (could also be done as a parameter override outside of the Dockerfile)
CMD [ "index.main" ]
